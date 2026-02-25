import { ReactNode } from "react";

export class MenuConfigModel {
  constructor(
    public name: string,
    public path: string,
    public componentName: string,
    public icon: ReactNode,
    public featureKey: Array<string>,
    public subMenu: MenuConfigModel[] = [],
    public enable?: boolean
  ) {}
}

export class SidebarMenuConfigModel {
  constructor(public menu: MenuConfigModel[]) {}
}