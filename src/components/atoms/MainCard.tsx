import React from "react";

export function MainCard(props: IProps) {
  return (
    <div
      className={`bg-slate-900/20 border border-slate-400/20 rounded-lg backdrop-blur-xl p-4 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}

interface IProps {
  children: any;
  className?: string;
}
