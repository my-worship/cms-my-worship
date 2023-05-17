import { StringRoutes } from "./string-routes";
import { HomePage } from "../pages/home/HomePage";
import { ArtistPage } from "../pages/artist/ArtistPage";
import { LyricsPages } from "../pages/lyrics-pages";

const stringRoutes = new StringRoutes();
export const routes = [
  { path: stringRoutes.root(), components: HomePage },
  { path: stringRoutes.artist(), components: ArtistPage },
  { path: stringRoutes.lyrics(), components: LyricsPages },
];
