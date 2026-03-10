import { NavigateFunction } from "react-router-dom";

export interface ILoginState {
  loading: boolean;
}

export interface ILoginFeature {
  navigate: NavigateFunction;
}
