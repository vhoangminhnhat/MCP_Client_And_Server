export class MenuModuleEntity {
  name?: string;
  path?: string;
  routeKey?: string;
  icon?: unknown;
  featureKey?: string[] = [];
  subMenu?: MenuModuleEntity[] = [];
  enable?: boolean;

  constructor(data?: Partial<MenuModuleEntity>) {
    this.name = data?.name;
    this.routeKey = data?.routeKey;
    this.path = data?.path;
    this.icon = data?.icon;
    this.featureKey = data?.featureKey;
    this.subMenu = data?.subMenu;
    this.enable = data?.enable;
  }
}
