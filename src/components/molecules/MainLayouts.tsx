import { Sidebar } from "./Sidebar";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UserActions } from "../../redux/actions/user.actions";

export function MainLayouts(props: IProps) {
  const [mainLoading, setMainLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const userActions = new UserActions();
  const { User } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(userActions.getMeData()).then();
  }, []);

  useEffect(() => {
    if (User.getMeData?.loading !== undefined) {
      setMainLoading(User.getMeData.loading);
    }
  }, [User?.getMeData?.loading]);

  return (
    <div className={"min-h-screen w-full flex"}>
      {mainLoading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          <Sidebar />
          <div className={"px-20 overflow-y-auto w-full py-8"}>
            {props.children}
          </div>
        </>
      )}
    </div>
  );
}

interface IProps {
  children: any;
}
