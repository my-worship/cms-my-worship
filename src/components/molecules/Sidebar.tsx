import React from "react";
import { BrandLogo } from "../atoms/BrandLogo";
import { Link } from "react-router-dom";
import { assets } from "../../constants/assets";
import { ReactSVG } from "react-svg";

export function Sidebar() {
  const navbarList = [
    {
      title: "Home",
      path: "/",
      iconDefault: assets.sidebar_icon.home.default,
      iconActive: assets.sidebar_icon.home.active,
    },
    {
      title: "Lyrics",
      path: "/",
      iconDefault: assets.sidebar_icon.home.default,
      iconActive: assets.sidebar_icon.home.active,
    },
    {
      title: "Artist",
      path: "/",
      iconDefault: assets.sidebar_icon.home.default,
      iconActive: assets.sidebar_icon.home.active,
    },
  ];
  return (
    <div className={"bg-system-dark-primary/40 backdrop-blur-lg h-screen"}>
      <div className={"px-10 py-7 flex flex-col h-full  justify-between"}>
        <div className={"h-full"}>
          <BrandLogo />
          <div className={"mt-7"}>
            <ul className={"grid gap-4"}>
              {navbarList.map((item, i) => (
                <li key={i}>
                  <Link
                    className={`text-white flex items-center w-full  hover:bg-slate-600/10 px-5 rounded-md text-xl font-semibold py-2 ${
                      i === 0 ? "border border-primary-main/20" : ""
                    }`}
                    to={item.path}
                  >
                    <div
                      className={`flex items-center gap-4 ${
                        i === 0 ? "active_sidebar_link" : ""
                      }`}
                    >
                      <div>
                        <ReactSVG
                          src={i === 0 ? item.iconActive : item.iconDefault}
                        />
                      </div>
                      {item.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={"text-slate-500 text-sm"}>
          © {new Date().getFullYear() + " - My Worship"}
        </div>
      </div>
    </div>
  );
}
