import React, { useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ReactSVG } from "react-svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbarList } from "../../constants/SidebarMenu";
import { BrandLogo } from "../atoms/BrandLogo";
import { ISidebarMenu } from "../../utilities/type-utils";

const checkActiveSidebar = (path: string): string => {
  const splitPath = path.split("/");
  return splitPath[1];
};
const checkActiveSidebarChild = (path: string): string => {
  const splitPath = path.split("/");
  return splitPath[2];
};

function hasChildren(item: any) {
  const { items: children } = item;
  if (children === undefined) {
    return false;
  }
  if (children.constructor !== Array) {
    return false;
  }
  return children.length !== 0;
}

export const Sidebar = () => {
  return (
    <div>
      <div className={"w-[360px]"}></div>
      <div
        className={
          "w-[360px]  bg-white z-[10] fixed  border h-full sidebar-layout px-3"
        }
      >
        <div className={"py-8 px-6"}>
          <BrandLogo />
        </div>
        {navbarList.map((item: ISidebarMenu, key: any) => (
          <MenuItem key={key} item={item} />
        ))}
      </div>
    </div>
  );
};

interface IMenuItem {
  item: ISidebarMenu;
}

const MenuItem = ({ item }: IMenuItem) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }: IMenuItem) => {
  const navigate = useNavigate();
  const handleClick = (link?: string) => {
    if (link) {
      navigate(link);
    }
  };
  const uri = location.pathname;

  return (
    <ListItem
      button
      classes={{
        button: `${
          checkActiveSidebar(uri) === checkActiveSidebar(item.path) &&
          "active-link"
        }  list_item_sidebar`,
      }}
      onClick={() => handleClick(item.path)}
    >
      <ListItemIcon>
        <ReactSVG
          src={
            checkActiveSidebar(uri) === checkActiveSidebar(item.path)
              ? item.activeIcon
              : item.icon ?? ""
          }
        />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item }: IMenuItem) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const uri = location.pathname;
  const handleClick = (link?: string) => {
    console.log(checkActiveSidebar(link ?? ""));
    if (checkActiveSidebar(link ?? "") === checkActiveSidebar(uri)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    if (link) {
      navigate(link);
    }
  };

  useEffect(() => {
    if (item.path !== uri) {
      setOpen(false);
    }
  }, [uri]);

  return (
    <div
      className={`${
        checkActiveSidebar(uri) === checkActiveSidebar(item.path) &&
        "active-link"
      }`}
    >
      <ListItem
        button
        onClick={() => handleClick(item.path)}
        className={` list_item_sidebar`}
      >
        <ListItemIcon>
          <ReactSVG
            src={
              checkActiveSidebar(uri) === checkActiveSidebar(item.path)
                ? item.activeIcon
                : item.icon
            }
          />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children?.length &&
            children.map((child?: any, key?: any) => (
              <Link key={key} to={child.path}>
                <div className={"py-3"} key={key}>
                  {child.title} 123
                </div>
              </Link>
            ))}
        </List>
      </Collapse>
    </div>
  );
};
