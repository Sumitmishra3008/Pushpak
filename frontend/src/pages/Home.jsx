import React from "react";
import { Navigate } from "react-router-dom";

function Home() {
  // const isAuthenticated = false; // Replace with your authentication logic

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div class="bg-black font-lg text-white">
      <h1>Home</h1>
    </div>
  );
}

export default Home;
