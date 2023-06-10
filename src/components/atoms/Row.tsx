import React, { CSSProperties } from "react";

export const Row = (props: IProps) => {
  const checkSize = (size?: "sm" | "md" | "lg" | "xl"): number | undefined => {
    switch (size) {
      case "sm":
        return 10;
      case "md":
        return 16;
      case "lg":
        return 20;
      case "xl":
        return 24;
      default:
        return undefined;
    }
  };

  return (
    <div
      className={`${props.fitContent ? "w-fit" : "w-full"} flex  ${
        props.className
      }`}
      style={{
        ...props.style,
        justifyContent: props.justify,
        alignItems: props.itemsAlign,
        gap: checkSize(props.gap),
        marginBottom: checkSize(props.mb),
        marginTop: checkSize(props.mt),
      }}
    >
      {props.children}
    </div>
  );
};

interface IProps {
  justify?: "center" | "end" | "start" | "space-between";
  itemsAlign?: "center" | "end" | "start";
  children: any;
  className?: string;
  style?: CSSProperties;
  fitContent?: boolean;
  gap?: "sm" | "md" | "lg" | "xl";
  mt?: "sm" | "md" | "lg" | "xl";
  mb?: "sm" | "md" | "lg" | "xl";
}
