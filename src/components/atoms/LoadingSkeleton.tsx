import React from "react";
import { Skeleton } from "@mui/material";
import { Row } from "./Row";
import { Col } from "./Col";

export const LoadingSkeleton = (props: IProps) => {
  const loading = (
    <>
      {Array.from({ length: props.length ?? 1 }).map((_, i) => (
        <Skeleton
          data-testid={"_skeleton_loading"}
          key={i}
          className={
            props.fullRounded
              ? "pill_skeleton_customs test_skeleteon"
              : "test_skeleteon"
          }
          height={props.height ?? "100%"}
          width={props.width ?? "100%"}
          variant={props.variant ?? "rounded"}
        />
      ))}
    </>
  );
  if (props.isRow) {
    return (
      <Row className={props.className} gap={props.gap}>
        {loading}
      </Row>
    );
  } else {
    return (
      <Col className={props.className} gap={props.gap}>
        {loading}
      </Col>
    );
  }
};

interface IProps {
  variant?: "text" | "rectangular" | "rounded" | "circular";
  height?: number | string;
  width?: number | string;
  fullRounded?: boolean;
  isRow?: boolean;
  length?: number;
  className?: string;

  gap?: "sm" | "md" | "lg" | "xl";
}
