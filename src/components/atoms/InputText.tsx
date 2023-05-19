import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";

export function InputText(props: IProps) {
  return (
    <div className={"w-full"}>
      <TextField
        name={props.name}
        fullWidth={true}
        id={props.id}
        inputProps={{
          form: {
            autocomplete: "off",
          },
        }}
        autoComplete="off"
        label={props.label}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.onBlur}
        helperText={props.errorMessage}
        error={!!props.errorMessage}
        variant="outlined"
        onKeyPress={(e) => {
          if (e.key === "Enter" && props.onEnter) {
            props.onEnter();
          }
        }}
        InputProps={{
          endAdornment: props.icon && (
            <InputAdornment position="start">
              {props.onClickIcon ? (
                <IconButton onClick={props.onClickIcon}>
                  {props.icon}
                </IconButton>
              ) : (
                <div className={"-translate-x-2"}>{props.icon}</div>
              )}
            </InputAdornment>
          ),
        }}
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
  onClickIcon?: () => void;
  value?: any;
  inputClassName?: string;
  inputColor?: string;
  onEnter?: () => void;
}
