import React, { useState } from "react";
import { MainCard } from "../../components/atoms/MainCard";
import { InputText } from "../../components/atoms/InputText";
import { Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import { Btn } from "../../components/atoms/Btn";
import { ILoginRequest } from "../../model/request/ILoginRequest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleButtonAuth } from "../../components/atoms/GoogleAuthButton";
import { AuthActions } from "../../redux/actions/auth.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const authActions = new AuthActions();
  const dispatch = useAppDispatch();
  const { Auth } = useAppSelector((state) => state);

  const initStateLogin: ILoginRequest = {
    email: "",
    password: "",
  };

  const validationScheme = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: initStateLogin,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      dispatch(authActions.login(values)).then();
    },
  });

  return (
    <div className={"flex w-full h-screen"}>
      <div className={"w-1/2"}></div>
      <div className={"w-1/2 flex h-full items-center justify-center"}>
        <MainCard>
          <h1>
            Hello, <br /> Welcome to my worship CMS app
          </h1>
          <div className={"mt-10 grid gap-6"}>
            <InputText
              label={"Email"}
              icon={<Mail />}
              name={"email"}
              id={"email"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onEnter={() => formik.handleSubmit()}
              value={formik.values.email}
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <InputText
              id={"password"}
              label={"Password"}
              type={showPassword ? "text" : "password"}
              icon={showPassword ? <VisibilityOff /> : <Visibility />}
              onClickIcon={() => setShowPassword(!showPassword)}
              name={"password"}
              onEnter={() => formik.handleSubmit()}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              errorMessage={formik.touched.password && formik.errors.password}
            />
            <Btn onClick={() => formik.handleSubmit()}>
              {Auth.login ? "Loading" : "Login"}
            </Btn>
            <GoogleButtonAuth />
          </div>
        </MainCard>
      </div>
    </div>
  );
}
