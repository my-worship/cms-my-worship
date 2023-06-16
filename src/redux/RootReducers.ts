import { combineReducers } from "redux";
import { GeneralSlice } from "./reducers/general.reducers";
import { AuthSlice } from "./reducers/auth.reducers";
import { ArtistSlice } from "./reducers/artist.reducers";
import { UserSlice } from "./reducers/user.reducers";
import { CategorySlice } from "./reducers/category.reducers";

export default combineReducers({
  General: GeneralSlice.reducer,
  Auth: AuthSlice.reducer,
  Artist: ArtistSlice.reducer,
  User: UserSlice.reducer,
  Category: CategorySlice.reducer,
});
