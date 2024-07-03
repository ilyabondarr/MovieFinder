import "../sass/main.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "../components/App.jsx";

const app = createRoot(document.getElementById("app"));

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
