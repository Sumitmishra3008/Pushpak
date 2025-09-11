import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./context/Userdatacontext.jsx";
import CaptainContext from "./context/CaptainDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <Usercontext>
    <CaptainContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CaptainContext>
  </Usercontext>
);
