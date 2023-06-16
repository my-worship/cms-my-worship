import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { ILabelValue } from "../../utilities/type-utils";

export default function InputAutoComplete(props: IProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ILabelValue<any>[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [value, setValue] = useState<ILabelValue<any>>();
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    if (props.options && props.options.length) {
      setOptions(props.options);
    }
  }, [props.options]);

  useEffect(() => {
    if (options.length && props.value) {
      const filter = options.find((e) => e.value === props.value);
      setValue(filter);
    }
  }, [props.value, options]);

  function onChange(e: any, value: any) {
    const filter = options.find((v) => v.value === value?.value);
    setValue(filter);
    if (props.onChange) {
      props.onChange(filter?.value);
    }
  }

  return (
    <Autocomplete
      value={{
        value: value?.value ?? "",
        label: value?.label ?? "",
      }}
      id={props.id}
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      onChange={onChange}
      options={options ?? []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          helperText={props.errorMessage}
          error={!!props.errorMessage}
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            placeholder: props.placeholder,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

interface IProps {
  options?: ILabelValue<any>[];
  loading?: boolean;
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: number | string) => void;
  value?: any;
  errorMessage?: any;
}
