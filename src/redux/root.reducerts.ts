import { combineReducers } from "redux";
import { GeneralSlice } from "./reducers/general.reducers";
import { AuthSlice } from "./reducers/auth.reducers";

export default combineReducers({
  General: GeneralSlice.reducer,
  Auth: AuthSlice.reducer,
});
