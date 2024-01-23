import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ThemeProvider } from "./components/ThemeContext";
import "./styles/Index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
