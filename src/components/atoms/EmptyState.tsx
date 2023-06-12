import React from "react";
import { MainCard } from "./MainCard";
import { Col } from "./Col";
import { PopupContent } from "./PopupContent";
import { assets } from "../../constants/assets";

export function EmptyState() {
  return (
    <MainCard>
      <Col className={"min-h-[350px]"} justify={"center"} itemsAlign={"center"}>
        <PopupContent
          subTitle={"Empty Data"}
          image={assets.illustration.il_empty_data}
        />
      </Col>
    </MainCard>
  );
}
