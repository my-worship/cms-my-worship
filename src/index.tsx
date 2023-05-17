import React from "react";
import ReactDOM from "react-dom/client";
import { themeConfig } from "./config/theme.config";
import { ThemeProvider } from "@mui/material";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
