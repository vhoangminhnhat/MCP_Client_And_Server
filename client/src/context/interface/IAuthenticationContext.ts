import { Dispatch, SetStateAction } from "react";

export interface IAuthenticationContext {
  userInfo: Record<string, unknown>;
  isLargeScreen: boolean;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setUserInfo: Dispatch<SetStateAction<Record<string, unknown>>>;
}
