import React from "react";
import { ReactSVG } from "react-svg";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { assets } from "../../constants/assets";

export const GoogleButtonAuth = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token) {
        alert(tokenResponse.access_token);
      }
    },
  });
  return (
    <>
      <Button onClick={() => login()} variant={"outlined"} color={"secondary"}>
        <div className={"flex items-center gap-3 my-2"}>
          <ReactSVG src={assets.icons.ic_google} />
          <>
            <div>Log in with Google</div>
          </>
        </div>
      </Button>
    </>
  );
};
