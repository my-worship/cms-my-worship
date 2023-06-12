import { AnyAction, applyMiddleware, compose, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducers from "./RootReducers";

const storeRedux = createStore(rootReducers, compose(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default storeRedux;
