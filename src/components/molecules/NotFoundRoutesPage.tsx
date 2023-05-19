import React, { useEffect } from "react";
import { Btn } from "../atoms/Btn";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthService";

export function NotFoundRoutesPage() {
  const navigate = useNavigate();
  const authService = new AuthServices();

  useEffect(() => {
    navigate("/auth/login");
  }, []);

  if (authService.authCheck()) {
    return (
      <div className={"h-screen w-screen flex items-center justify-center"}>
        <div className={"flex items-center justify-center flex-col gap-4"}>
          <h1 className={"text-6xl"}>Not Found</h1>
          <Btn onClick={() => navigate("/")}>Back To Home Page</Btn>
        </div>
      </div>
    );
  } else {
    return <div className={"h-screen w-screen"}></div>;
  }
}
