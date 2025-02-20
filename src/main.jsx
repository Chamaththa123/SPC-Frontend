import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import './assets/css/style.css'
import { ContextProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
    < >
      <RouterProvider router={router} />
    </ >
    </ContextProvider>
  </React.StrictMode>
);
