import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Userdatacontext } from "../context/Userdatacontext.jsx";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(Userdatacontext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/usersignup");
      console.log("No token found, redirecting to signup.");
    }

    axios
      .get("http://localhost:3000/api/v1/user/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/usersignup");
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  return loading ? <div>Loading...</div> : <>{children}</>;
};

export default UserProtectWrapper;
