import { StringRoutes } from "./string-routes";
import { HomePage } from "../pages/home/HomePage";
import { ArtistPage } from "../pages/artist/ArtistPage";
import { LyricsPage } from "../pages/Lyrics/LyricsPage";
import { NewArtistRequestPage } from "../pages/artist/NewArtistRequestPage";
import { DetailArtistPage } from "../pages/artist/DetailArtistPage";

const stringRoutes = new StringRoutes();
export const routes = [
  { path: stringRoutes.root(), components: HomePage },
  { path: stringRoutes.artist(":status"), components: ArtistPage },
  { path: stringRoutes.requestArtist(), components: NewArtistRequestPage },
  { path: stringRoutes.lyrics(), components: LyricsPage },
  { path: stringRoutes.detailArtist(":slug"), components: DetailArtistPage },
];
