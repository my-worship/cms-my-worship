import { TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";

export function InputTextarea(props: IProps) {
  return (
    <div className={"w-full"}>
      <TextField
        id="outlined-multiline-static"
        label={props.label}
        multiline
        rows={4}
        fullWidth={true}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={props.className}
        error={!!props.errorMessage}
        helperText={props.errorMessage}
        value={props.value}
      />
    </div>
  );
}

interface IProps {
  label?: string;
  disable?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: any;
  name?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  onBlur?: any;
  onChange?: any;
  icon?: any;
  onClickIcon?: () => any;
  value?: any;
  inputClassName?: string;
  inputColor?: string;
}