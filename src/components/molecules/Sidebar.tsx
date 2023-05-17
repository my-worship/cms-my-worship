import React, { useEffect, useState } from "react";
import { BrandLogo } from "../atoms/BrandLogo";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../constants/assets";
import { ReactSVG } from "react-svg";
import { StringRoutes } from "../../routes/string-routes";

export function Sidebar() {
  const [currentPath, setCurrentPath] = useState<string>();

  const location = useLocation();
  const stringRoutes = new StringRoutes();

  useEffect(() => {
    const loc = location.pathname.split("/")[1];
    setCurrentPath(loc);
  }, [location.pathname]);

  const navbarList = [
    {
      title: "Home",
      path: stringRoutes.root(),
      iconDefault: assets.sidebar_icon.home.default,
      iconActive: assets.sidebar_icon.home.active,
    },
    {
      title: "Lyrics",
      path: stringRoutes.lyrics(),
      iconDefault: assets.sidebar_icon.home.default,
      iconActive: assets.sidebar_icon.home.active,
    },
    {
      title: "Artist",
      path: stringRoutes.artist(),
      iconDefault: assets.sidebar_icon.artist.default,
      iconActive: assets.sidebar_icon.artist.active,
    },
  ];

  return (
    <div>
      <div className={"w-[300px]"}></div>
      <div
        className={
          "bg-system-dark-primary/40 backdrop-blur-lg h-screen fixed w-[300px]"
        }
      >
        <div className={"px-3 py-7 flex flex-col h-full  justify-between"}>
          <div className={"h-full"}>
            <div className={"px-8"}>
              <BrandLogo />
            </div>
            <div className={"mt-7"}>
              <ul className={"grid gap-4"}>
                {navbarList.map((item, i) => (
                  <li key={i}>
                    <Link
                      className={`text-white flex items-center w-full  hover:bg-slate-600/10 px-5 rounded-md text-xl font-semibold py-2 ${
                        item.path.split("/")[1] === currentPath
                          ? "border border-primary-main/20"
                          : ""
                      }`}
                      to={item.path}
                    >
                      <div
                        className={`flex items-center gap-4 ${
                          item.path.split("/")[1] === currentPath
                            ? "active_sidebar_link"
                            : ""
                        }`}
                      >
                        <div>
                          <ReactSVG
                            src={
                              item.path.split("/")[1] === currentPath
                                ? item.iconActive
                                : item.iconDefault
                            }
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
          <div className={"text-slate-500 text-sm text-center"}>
            © {new Date().getFullYear() + " - My Worship"}
          </div>
        </div>
      </div>
    </div>
  );
}
