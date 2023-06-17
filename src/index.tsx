import React from "react";
import ReactDOM from "react-dom/client";
import { themeConfig } from "./config/theme.config";
import { ThemeProvider } from "@mui/material";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ENV } from "./constants/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import storeRedux from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <ThemeProvider theme={themeConfig}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <GoogleOAuthProvider clientId={ENV.GOOGLE_ID ?? ""}>
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
