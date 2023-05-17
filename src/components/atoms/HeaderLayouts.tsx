import React from "react";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { BreadcrumbComponents } from "./BreadcrumbComponent";
import { ProfileMenu } from "./ProfileMenu";

export function HeaderLayouts(props: IProps) {
  return (
    <div className={"flex w-full items-center justify-between"}>
      <div>
        <h1>{props.title}</h1>
        {props.breadcrumbData && (
          <BreadcrumbComponents BreadcrumbList={props.breadcrumbData} />
        )}
      </div>
      <div>
        <ProfileMenu />
      </div>
    </div>
  );
}

interface IProps {
  title: string;
  breadcrumbData?: IBreadCrumbList[];
}
