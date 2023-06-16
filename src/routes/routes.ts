import { StringRoutes } from "./string-routes";
import { HomePage } from "../pages/home/HomePage";
import { ArtistPage } from "../pages/artist/ArtistPage";
import { LyricsPage } from "../pages/Lyrics/LyricsPage";
import { NewArtistRequestPage } from "../pages/artist/NewArtistRequestPage";
import { DetailArtistPage } from "../pages/artist/DetailArtistPage";
import { NewEditLyricPage } from "../pages/Lyrics/NewEditLyricPage";

const stringRoutes = new StringRoutes();
export const routes = [
  { path: stringRoutes.root(), components: HomePage },

  // ARTIST
  { path: stringRoutes.artist(), components: ArtistPage },
  { path: stringRoutes.requestArtist(), components: NewArtistRequestPage },
  { path: stringRoutes.detailArtist(":slug"), components: DetailArtistPage },
  { path: stringRoutes.editArtist(":slug"), components: NewArtistRequestPage },

  // LYRICS
  { path: stringRoutes.lyrics(), components: LyricsPage },
  { path: stringRoutes.newLyrics(), components: NewEditLyricPage },
];
