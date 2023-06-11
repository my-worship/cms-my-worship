import React from "react";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { ProfileMenu } from "./ProfileMenu";
import { MainCard } from "./MainCard";
import { BreadcrumbComponents } from "./BreadcrumbComponent";

export function HeaderLayouts(props: IProps) {
  return (
    <MainCard className={"flex w-full items-center justify-between"}>
      <div>
        <h1>{props.title}</h1>
        {props.breadcrumbData && (
          <BreadcrumbComponents BreadcrumbList={props.breadcrumbData} />
        )}
      </div>
      {props?.rightContent ? (
        <div>
          <div>{props?.rightContent}</div>
        </div>
      ) : (
        <div>{!props.disableProfileButton && <ProfileMenu />}</div>
      )}
    </MainCard>
  );
}

interface IProps {
  title: string;
  breadcrumbData?: IBreadCrumbList[];
  rightContent?: any;
  disableProfileButton?: boolean;
}
