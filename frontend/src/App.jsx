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
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainHome from "./pages/CaptainHome";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/captainhome"
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />
      <Route path="/captainsignup" element={<CaptainSignup />} />
      <Route path="/captainsignin" element={<CaptainSignin />} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/usersignin" element={<UserSignin />} />
    </Routes>
  );
}

export default App;
