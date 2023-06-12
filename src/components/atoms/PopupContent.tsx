import React from "react";
import { LoadingSpinner } from "./LoadingSpiner";

export function PopupContent(props: IProps) {
  return (
    <div className={"w-full flex flex-col items-center gap-4 relative"}>
      <div
        style={{
          opacity: props.isLoading ? 1 : 0,
        }}
        className={
          "m-auto flex items-center justify-center absolute h-full w-full"
        }
      >
        <LoadingSpinner />
      </div>
      <div
        style={{
          opacity: props.isLoading ? 0 : 1,
        }}
        className={`flex flex-col items-center gap-4 h-full w-full`}
      >
        <h2>{props.title}</h2>
        {props.image && (
          <img
            style={{
              height: 180,
            }}
            draggable={false}
            alt={"illustration"}
            src={props.image}
          />
        )}
        <div>{props.subTitle}</div>
      </div>
    </div>
  );
}

interface IProps {
  image?: string;
  title?: string;
  subTitle?: string;
  isLoading?: boolean;
}
