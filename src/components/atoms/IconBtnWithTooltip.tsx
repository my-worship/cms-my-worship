import React from "react";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Delete } from "@mui/icons-material";

export function IconBtnWithTooltip(props: IProps) {
  return (
    <div>
      <Tooltip title={props.label}>
        <IconButton>{props.icon}</IconButton>
      </Tooltip>
    </div>
  );
}

interface IProps {
  icon: any;
  label: string;
}
