import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatainContext";
import axios from "axios";

export default function CaptainProtectWrapper({ children }) {
  const navigate = useNavigate();
  const { captainData, setCaptainData, setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/captainsignin");
      return;
    }

    let mounted = true;
    const fetchCaptain = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/captain/getcaptain", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.debug('getcaptain response:', response?.data);
        const c = response.data?.captain ?? response.data;
        if (!mounted) return;
        if (setCaptainData) setCaptainData(c);
        if (setCaptain) setCaptain(c);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch captain:', err);
        if (!mounted) return;
        setError(err?.response?.data?.message || err.message || 'Unknown error');
        setLoading(false);
        // navigate to signin after showing error
        // navigate('/captainsignin')
      }
    };

    fetchCaptain();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="mb-4">Error loading profile: {error}</p>
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={() => navigate('/captainsignin')}
        >
          Sign in
        </button>
      </div>
    )
  }

  return children;
}
