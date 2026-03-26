import { MenuModuleEntity } from "./MenuModuleEntity";
import { RouteModuleEntity } from "./RouteModuleEntity";

export class ClientModuleEntity {
  name?: string;
  routes?: RouteModuleEntity[];
  menuItems?: MenuModuleEntity[];
  register?: () => void;

  constructor(data?: Partial<ClientModuleEntity>) {
    this.name = data?.name;
    this.routes = data?.routes;
    this.menuItems = data?.menuItems;
    this.register = data?.register;
  }
}
