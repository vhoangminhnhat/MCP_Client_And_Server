import { UserResponseModel } from "../data/dto/UserResponseModel";

export interface AuthSessionState {
  accessToken?: string;
  user?: UserResponseModel;
  remember?: boolean;
}

export interface AuthState {
  session: AuthSessionState;
  isAuthenticated: boolean;
}
