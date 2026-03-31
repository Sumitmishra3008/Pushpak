import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./context/Userdatacontext.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import CapatainContext from "./context/CapatainContext.jsx";

createRoot(document.getElementById("root")).render(
    <Usercontext>
      <SocketProvider>
        <CapatainContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CapatainContext>
      </SocketProvider>
    </Usercontext>
);
