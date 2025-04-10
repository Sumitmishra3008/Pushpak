import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaptainSignup from "./pages/Captainsignup";
import CaptainSignin from "./pages/Captainsignin";
import UserSignup from "./pages/Usersignup";
import UserSignin from "./pages/Usersignin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/captainsignup" element={<CaptainSignup />} />
      <Route path="/captainsignin" element={<CaptainSignin />} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/usersignin" element={<UserSignin />} />
    </Routes>
  );
}

export default App;
