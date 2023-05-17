import React from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { IBreadCrumbList } from "../../utilities/type-utils";

export function HomePage() {
  const breadcrumb: IBreadCrumbList[] = [
    { label: "Home", path: "/" },
    { label: "Home", path: "/" },
  ];

  return (
    <>
      <HeaderLayouts title={"Home"} breadcrumbData={breadcrumb} />
      <div className={"mt-10"}>
        {Array.from({ length: 300 }).map((_, i) => (
          <div key={i}>HOME PAGE</div>
        ))}
      </div>
    </>
  );
}
