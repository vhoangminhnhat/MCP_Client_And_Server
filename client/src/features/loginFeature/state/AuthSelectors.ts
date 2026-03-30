import { RootState } from "appCore/states/stores/Store";

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthSession = (state: RootState) => state.auth.session;
export const selectAuthUser = (state: RootState) => state.auth.session.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
