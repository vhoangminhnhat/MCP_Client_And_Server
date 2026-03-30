import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../stores/Store";
// import { authActions } from "features/loginFeature/state/authSlice";
// import { productCache } from "utils/cache/ProductCache";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

// Example:
// startAppListening({
//   actionCreator: authActions.setUser,
//   effect: async (action) => {
//     // sync cache / analytics / local persistence here
//     // productCache.saveCache({
//     //   key: "user",
//     //   product: action.payload,
//     //   needExpired: false,
//     // });
//   },
// });