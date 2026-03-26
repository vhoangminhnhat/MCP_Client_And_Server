import { injectable } from "tsyringe";
import { ClientModuleEntity } from "../entities/ClientModuleEntity";

@injectable()
export class ValidateModulesUseCase {
  execute(modules: ClientModuleEntity[]): ClientModuleEntity[] {
    const moduleNames = new Set<string>();
    const routeKeys = new Set<string>();
    const routePaths = new Set<string>();

    modules.forEach((module) => {
      const moduleName = module.name?.trim();
      if (!moduleName) {
        throw new Error("Client module name is required");
      }

      if (moduleNames.has(moduleName)) {
        throw new Error(`Duplicate client module name: ${moduleName}`);
      }

      moduleNames.add(moduleName);

      module.routes?.forEach((route) => {
        const routeKey = route.key?.trim();
        const routePath = route.path?.trim();

        if (!routeKey) {
          throw new Error(`Route key is required in module: ${moduleName}`);
        }

        if (!routePath) {
          throw new Error(`Route path is required in module: ${moduleName}`);
        }

        if (routeKeys.has(routeKey)) {
          throw new Error(`Duplicate route key: ${routeKey}`);
        }

        if (routePaths.has(routePath)) {
          throw new Error(`Duplicate route path: ${routePath}`);
        }

        routeKeys.add(routeKey);
        routePaths.add(routePath);
      });
    });

    modules.forEach((module) => {
      module.menuItems?.forEach((menu) => {
        const routeKey = menu.routeKey?.trim();
        if (routeKey && !routeKeys.has(routeKey)) {
          throw new Error(
            `Menu routeKey ${routeKey} does not exist in module: ${module.name}`,
          );
        }
      });
    });

    return modules;
  }
}
