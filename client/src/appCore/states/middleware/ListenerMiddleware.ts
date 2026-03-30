import {
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { productCache } from "utils/cache/ProductCache";
import { CachedKeyEnum } from "utils/enum/CachedKeyEnum";
import { AppDispatch, RootState } from "../stores/Store";
import { authActions } from "@/features/loginFeature/state/AuthSlice";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

startAppListening({
  actionCreator: authActions.setAuthSession,
  effect: async (action) => {
    const { accessToken, user, remember } = action.payload;

    if (!accessToken) {
      return;
    }

    if (remember) {
      localStorage.setItem("isSavedForNextLogin", "true");
      localStorage.setItem(CachedKeyEnum.mainToken, accessToken);
      sessionStorage.removeItem(CachedKeyEnum.mainToken);
    } else {
      localStorage.setItem("isSavedForNextLogin", "false");
      sessionStorage.setItem(CachedKeyEnum.mainToken, accessToken);
      localStorage.removeItem(CachedKeyEnum.mainToken);
    }

    productCache.saveCache({
      key: "user",
      product: user || {},
      needExpired: false,
    });
  },
});

startAppListening({
  actionCreator: authActions.clearAuthSession,
  effect: async () => {
    localStorage.removeItem(CachedKeyEnum.mainToken);
    sessionStorage.removeItem(CachedKeyEnum.mainToken);
    productCache.resetCache("user");
  },
});
