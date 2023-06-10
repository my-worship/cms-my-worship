import React, { CSSProperties } from "react";
import { FlexBoxType, SizeType } from "../../utilities/type-utils";

export const Col = (props: IProps) => {
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
      className={`flex flex-col   ${props.className}`}
      style={{
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
  style?: CSSProperties;
  justify?: FlexBoxType;
  itemsAlign?: FlexBoxType;
  children: any;
  className?: string;
  gap?: SizeType;
  mt?: SizeType;
  mb?: SizeType;
}
