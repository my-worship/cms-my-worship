import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import Main from "./pages/Main";
import AuthServices from "./services/AuthService";
import { NotFoundRoutesPage } from "./components/molecules/NotFoundRoutesPage";

function App() {
  const authService = new AuthServices();
  return (
    <div className="flex">
      {authService.authCheck() ? (
        <Main />
      ) : (
        <Routes>
          <Route path={"/auth/login"} element={<LoginPage />} />
          <Route path={"*"} element={<NotFoundRoutesPage />} />;
        </Routes>
      )}
    </div>
  );
}

export default App;
