import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ILabelValue } from "../../utilities/type-utils";
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function InputMultipleAutoComplete(props: IProps) {
  const [data, setData] = useState<ILabelValue<any>[]>([]);
  const [value, setValue] = useState<ILabelValue<any>[]>([]);
  useEffect(() => {
    if (props?.options) {
      setData(props.options);
    }
  }, [props.options]);

  useEffect(() => {
    if (props?.value && data.length) {
      const filter = data.filter((item) => {
        if (props.value) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return props.value.includes(item.value);
        }
      });
      setValue(filter);
    }
  }, [data, props.value]);

  function onChange(e: any, v: any[]) {
    setValue(v);
    if (props.onChange) {
      props.onChange(v.map((item) => item?.value));
    }
  }

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={data}
      value={value}
      onChange={onChange}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
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
  onChange?: (e: number[] | string[]) => void;
  value?: number[] | string[];
}
