import { StringRoutes } from "./string-routes";
import { HomePage } from "../pages/home/HomePage";
import { ArtistPage } from "../pages/artist/ArtistPage";
import { LyricsPage } from "../pages/Lyrics/LyricsPage";
import { NewArtistRequestPage } from "../pages/artist/NewArtistRequestPage";

const stringRoutes = new StringRoutes();
export const routes = [
  { path: stringRoutes.root(), components: HomePage },
  { path: stringRoutes.artist(), components: ArtistPage },
  { path: stringRoutes.requestArtist(), components: NewArtistRequestPage },
  { path: stringRoutes.lyrics(), components: LyricsPage },
];
