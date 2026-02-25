import { SidebarMenuConfigModel } from "@/generalComponents/layoutComponent/sidebar/data/dto/SidebarMenuConfigModel";
import { Dispatch, SetStateAction } from "react";

export interface IAuthenticationContext {
  userInfo: Record<string, unknown>;
  isLargeScreen: boolean;
  language: string;
  menuConfig: SidebarMenuConfigModel;
  setMenuConfig: Dispatch<SetStateAction<SidebarMenuConfigModel>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  setUserInfo: Dispatch<SetStateAction<Record<string, unknown>>>;
}
