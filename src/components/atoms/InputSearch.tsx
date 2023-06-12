import React, { ReactElement, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";

interface IProps {
  onSearch?: (e: string) => void;
  isActiveSearch?: boolean;
  onReset?: (e?: string) => void;
  placeholder?: string;
  values?: string;
}

export const InputSearch = (props: IProps): ReactElement => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (props.values) {
      setValue(props.values);
    }
  }, [props.values]);
  const onEnter = () => {
    if (props.onSearch) {
      props.onSearch(value);
    }
  };

  const KeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  const onResetSearch = () => {
    setValue("");

    if (props.onSearch && props.onReset) {
      props.onSearch("");
      props.onReset("");
    }
  };
  return (
    <div className="w-96">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dtext-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          onKeyDown={KeyPress}
          type="text"
          id="default-search"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="block p-4 py-2 pl-10 pr-[56px]  w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 outline-0  focus:border-primary-main"
          placeholder={props.placeholder}
          required
        />
        {props.isActiveSearch && (
          <button
            type="submit"
            onClick={props.isActiveSearch ? onResetSearch : onEnter}
            className="absolute right-[5px] bottom-[5px]  outline-none focus:border-primary-500 ring-0   font-medium rounded-full text-sm px-4 py-1 "
          >
            {<Close fontSize={"small"} />}
          </button>
        )}
      </div>
    </div>
  );
};
