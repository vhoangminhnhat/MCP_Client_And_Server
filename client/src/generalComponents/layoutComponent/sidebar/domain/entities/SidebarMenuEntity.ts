import { MenuConfigModel } from "../../data/dto/SidebarMenuConfigModel";

export class SidebarMenuEntity {
  public static mapMenuItems(items: MenuConfigModel[] = []): MenuConfigModel[] {
    return items
      .filter((item) => item.enable !== false)
      .map((item) => {
        return new MenuConfigModel(
          item.name,
          item.path,
          item.componentName,
          item.icon,
          item.featureKey,
          this.mapMenuItems(item.subMenu),
        );
      })
      ?.filter((item) => item !== undefined && Boolean);
  }
}
