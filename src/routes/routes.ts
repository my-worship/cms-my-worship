import { StringRoutes } from "./string-routes";
import { HomePage } from "../pages/home/HomePage";
import { ArtistPage } from "../pages/artist/ArtistPage";
import { LyricsPage } from "../pages/Lyrics/LyricsPage";

const stringRoutes = new StringRoutes();
export const routes = [
  { path: stringRoutes.root(), components: HomePage },
  { path: stringRoutes.artist(), components: ArtistPage },
  { path: stringRoutes.lyrics(), components: LyricsPage },
];
