import { assets } from "./assets";
import { StringRoutes } from "../routes/string-routes";
import { ISidebarMenu } from "../utilities/type-utils";

const stringRoutes = new StringRoutes();

export const navbarList: ISidebarMenu[] = [
  {
    title: "Home",
    path: stringRoutes.root(),
    icon: assets.sidebar_icon.home.default,
    activeIcon: assets.sidebar_icon.home.active,
  },
  {
    title: "Lyrics",
    path: stringRoutes.lyrics(),
    icon: assets.sidebar_icon.home.default,
    activeIcon: assets.sidebar_icon.home.active,
  },
  {
    title: "Artist",
    path: stringRoutes.artist(),
    icon: assets.sidebar_icon.artist.default,
    activeIcon: assets.sidebar_icon.artist.active,
  },
];
