import React from "react";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export function IconBtnWithTooltip(props: IProps) {
  return (
    <div>
      <Tooltip title={props.label}>
        <IconButton onClick={props.onClick}>{props.icon}</IconButton>
      </Tooltip>
    </div>
  );
}

interface IProps {
  icon: any;
  label: string;
  onClick?: () => void;
}
