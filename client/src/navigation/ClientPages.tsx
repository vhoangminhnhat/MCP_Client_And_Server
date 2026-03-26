import NotFoundComponent from "generalComponents/notFoundComponent/NotFoundComponent";
import { ClientModuleInjection } from "appCore/modules/di/ClientModuleInjection";
import { ComponentType, FC, LazyExoticComponent } from "react";

export interface IClientPages {
  Component: LazyExoticComponent<FC<any> | ComponentType>;
  token?: symbol | string;
  addtionalProps?: unknown;
}

export class ClientPages {
  private static PageKeys: Record<string, IClientPages> = {};

  static async initPages() {
    const moduleRegistryUseCase =
      ClientModuleInjection.getModuleRegistryUseCase();
    const routes = await moduleRegistryUseCase.getRoutes();

    this.PageKeys = routes.reduce(
      (acc, route) => {
        const routeKey = route.key?.trim();
        if (!routeKey || !route.component) {
          return acc;
        }

        acc[routeKey] = {
          Component: route.component as LazyExoticComponent<
            FC<any> | ComponentType
          >,
          token: route.token,
          addtionalProps: route.additionalProps,
        };

        return acc;
      },
      {} as Record<string, IClientPages>,
    );
  }

  static getPage(key: string): any {
    return this.PageKeys[key]?.Component || NotFoundComponent;
  }

  static getToken(key: string) {
    return this.PageKeys[key]?.token;
  }

  static getAddtionalProps(key: string) {
    return this.PageKeys[key]?.addtionalProps;
  }
}

export default ClientPages;
