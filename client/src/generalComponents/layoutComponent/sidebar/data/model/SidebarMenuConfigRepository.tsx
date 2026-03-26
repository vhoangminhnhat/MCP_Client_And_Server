import { BasedApiResponseModel } from "appCore/basedModel/basedApiModel/BasedApiResponseModel";
import { ClientModuleInjection } from "appCore/modules/di/ClientModuleInjection";
import { MenuModuleEntity } from "appCore/modules/domain/entities/MenuModuleEntity";
import { IConfigRepository } from "../../domain/repositories/IConfigRepository";
import {
  MenuConfigModel,
  SidebarMenuConfigModel,
} from "../dto/SidebarMenuConfigModel";
import { SidebarMenuEntity } from "../../domain/entities/SidebarMenuEntity";

export class SidebarMenuConfigRepository implements IConfigRepository {
  private async getModuleMenus(): Promise<MenuModuleEntity[]> {
    const moduleRegistryUseCase = ClientModuleInjection.getModuleRegistryUseCase();
    return moduleRegistryUseCase.getMenus();
  }

  private mapModuleMenusToMenuConfig(
    menus: MenuModuleEntity[] = [],
  ): MenuConfigModel[] {
    return menus.map(
      (menu) =>
        new MenuConfigModel(
          menu.name || "",
          menu.path || "",
          menu.routeKey || "",
          menu.icon as any,
          menu.featureKey || [],
          this.mapModuleMenusToMenuConfig(menu.subMenu || []),
          menu.enable,
        ),
    );
  }

  async getSidebarMenu(
    role: boolean,
    language?: string,
  ): Promise<BasedApiResponseModel<SidebarMenuConfigModel>> {
    let menuConfig: MenuConfigModel[] = [];
    let rawMenu: MenuConfigModel[] = this.mapModuleMenusToMenuConfig(
      await this.getModuleMenus(),
    );

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
