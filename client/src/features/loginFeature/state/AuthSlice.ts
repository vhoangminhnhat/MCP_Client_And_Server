import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthSessionState } from "./AuthState";

const initialState: AuthState = {
  session: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession(state, action: PayloadAction<AuthSessionState>) {
      state.session = action.payload;
      state.isAuthenticated = Boolean(action.payload.accessToken);
    },
    clearAuthSession(state) {
      state.session = {};
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
