import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainDataContext";
import axios from "axios";

export default function CaptainProtectWrapper({ children }) {
  const navigate = useNavigate();
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captainsignin");
    }
    axios
      .get("http://localhost:3000/api/v1/captain/getcaptain", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCaptainData(response.data.captain);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/captainsignin");
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return children;
}
