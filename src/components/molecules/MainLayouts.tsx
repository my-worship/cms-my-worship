import { Sidebar } from "./Sidebar";
import React from "react";

export function MainLayouts(props: IProps) {
  return (
    <div className={"min-h-screen w-full flex"}>
      <Sidebar />
      <div className={"px-20 overflow-y-auto w-full py-8"}>
        {props.children}
      </div>
    </div>
  );
}

interface IProps {
  children: any;
}
