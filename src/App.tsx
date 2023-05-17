import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import Main from "./pages/Main";

function App() {
  const isAuth = true;
  return (
    <div className="flex">
      {isAuth ? (
        <Main />
      ) : (
        <Routes>
          <Route path={"/auth/login"} element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
