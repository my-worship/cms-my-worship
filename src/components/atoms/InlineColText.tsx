import React from "react";

export function InlineColText(props: IProps) {
  return (
    <div
      className={`${props.className ? props.className : ""} ${
        props.isBorderBottom ? "border-b pb-1" : ""
      }`}
    >
      <div className={"text-gray-600 text-sm font-semibold"}>
        {props.label} :
      </div>
      <div className={"text-gray-900 font-semibold"}>{props.value}</div>
    </div>
  );
}

interface IProps {
  label: string;
  value: string | number;
  isBorderBottom?: boolean;
  className?: string;
}
