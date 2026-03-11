import { NavigateFunction } from "react-router-dom";

export interface ILoginState {
  loading: boolean;
  mode: "login" | "signUp";
}

export interface ILoginFeature {
  navigate: NavigateFunction;
}
