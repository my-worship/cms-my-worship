import React from "react";
import { MainCard } from "./MainCard";
import { Col } from "./Col";
import { LoadingSpinner } from "./LoadingSpiner";

export function LoadingCard() {
  return (
    <MainCard className={"h-96"}>
      <Col className={"h-full gap-4"} justify={"center"} itemsAlign={"center"}>
        <LoadingSpinner />
        <h2>Loading</h2>
      </Col>
    </MainCard>
  );
}