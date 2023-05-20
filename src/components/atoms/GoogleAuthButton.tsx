import React from "react";
import { ReactSVG } from "react-svg";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { assets } from "../../constants/assets";
import { AuthActions } from "../../redux/actions/auth.actions";
import { useAppDispatch } from "../../redux/store";

export const GoogleButtonAuth = () => {
  const authActions = new AuthActions();
  const dispatch = useAppDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token) {
        dispatch(authActions.loginGoogle(tokenResponse.access_token)).then();
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
