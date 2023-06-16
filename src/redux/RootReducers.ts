import { combineReducers } from "redux";
import { GeneralSlice } from "./reducers/general.reducers";
import { AuthSlice } from "./reducers/auth.reducers";
import { ArtistSlice } from "./reducers/artist.reducers";
import { UserSlice } from "./reducers/user.reducers";
import { CategorySlice } from "./reducers/category.reducers";
import { LyricsSlice } from "./reducers/lyric.reducers";

export default combineReducers({
  General: GeneralSlice.reducer,
  Auth: AuthSlice.reducer,
  Artist: ArtistSlice.reducer,
  User: UserSlice.reducer,
  Lyric: LyricsSlice.reducer,
  Category: CategorySlice.reducer,
});
