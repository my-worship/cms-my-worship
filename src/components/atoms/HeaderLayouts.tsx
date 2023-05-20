import React from "react";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { BreadcrumbComponents } from "./BreadcrumbComponent";
import { ProfileMenu } from "./ProfileMenu";
import { MainCard } from "./MainCard";

export function HeaderLayouts(props: IProps) {
  return (
    <MainCard className={"flex w-full items-center justify-between"}>
      <div>
        <h1>{props.title}</h1>
        {props.breadcrumbData && (
          <BreadcrumbComponents BreadcrumbList={props.breadcrumbData} />
        )}
      </div>
      <div>
        <ProfileMenu />
      </div>
    </MainCard>
  );
}

interface IProps {
  title: string;
  breadcrumbData?: IBreadCrumbList[];
}
