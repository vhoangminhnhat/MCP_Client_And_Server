import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import { dummySidebar } from "@/utils/dummy/DummySidebar";
import { IConfigRepository } from "../../domain/repositories/IConfigRepository";
import {
  MenuConfigModel,
  SidebarMenuConfigModel,
} from "../dto/SidebarMenuConfigModel";
import { SidebarMenuEntity } from "../../domain/entities/SidebarMenuEntity";

export class SidebarMenuConfigRepository implements IConfigRepository {
  async getSidebarMenu(
    role: boolean,
    language?: string,
  ): Promise<BasedApiResponseModel<SidebarMenuConfigModel>> {
    let menuConfig: MenuConfigModel[] = [];
    let rawMenu: MenuConfigModel[] = [];

    switch (language) {
      case "vi":
        rawMenu = dummySidebar?.vi as Array<MenuConfigModel>;
        break;
      case "en":
        rawMenu = dummySidebar?.vi as Array<MenuConfigModel>;
        break;
      default:
        rawMenu = dummySidebar?.vi as Array<MenuConfigModel>;
    }

    if (!role) {
      rawMenu = SidebarMenuEntity.mapMenuItems(rawMenu);
    }
    menuConfig = SidebarMenuEntity.mapMenuItems(rawMenu);

    return Promise.resolve(
      new BasedApiResponseModel<SidebarMenuConfigModel>(
        undefined,
        new SidebarMenuConfigModel(menuConfig),
        undefined,
        undefined,
      ),
    );
  }
}

export default new SidebarMenuConfigRepository();
