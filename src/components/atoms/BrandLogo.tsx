import { ReactSVG } from "react-svg";
import { assets } from "../../constants/assets";
import React from "react";

export function BrandLogo() {
  return (
    <div className={"flex gap-2 items-center"}>
      <ReactSVG src={assets.logo.brand_logo} />
      <h1 className={"brand_color_gradient"}>My Worship</h1>
    </div>
  );
}
