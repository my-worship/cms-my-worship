import React from "react";
import { Button } from "@mui/material";

export function Btn(props: IProps) {
  const className = `${props.size === "lg" && "px-5 py-3"} ${props.className}`;
  return (
    <Button
      onClick={props.onClick}
      color={props.color}
      variant={props.variant ?? "contained"}
    >
      <div className={`${className} `}>{props.children}</div>
    </Button>
  );
}

interface IProps {
  variant?: "text" | "outlined" | "contained";
  size?: "lg";
  isLoading?: boolean;
  className?: string;
  width?: number;
  height?: number;
  children?: any;
  onClick?: () => void;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}
