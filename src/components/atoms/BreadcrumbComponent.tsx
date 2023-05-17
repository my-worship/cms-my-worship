import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IBreadCrumbList } from "../../utilities/type-utils";

interface IProps {
  BreadcrumbList: IBreadCrumbList[];
}

export const BreadcrumbComponents = (props: IProps) => {
  const [listBreadcrumb, setListBreadcrumb] = useState<IBreadCrumbList[]>([]);

  useEffect(() => {
    if (props.BreadcrumbList) {
      setListBreadcrumb(props.BreadcrumbList);
    } else {
      setListBreadcrumb([]);
    }
  }, [props.BreadcrumbList]);

  return (
    <div className={"text-white"}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext fontSize="inherit" />}
      >
        {listBreadcrumb.map((item, i) => {
          if (i !== listBreadcrumb.length - 1) {
            return (
              <div key={item.label}>
                <Link
                  className={"hover:border-b border-gray-400"}
                  to={item.path ?? "#"}
                >
                  {item.label}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={item.label} className={"font-bold"}>
                {item.label}
              </div>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};
