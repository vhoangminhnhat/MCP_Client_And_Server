import { injectable } from "tsyringe";
import { ClientModuleInjection } from "../../di/ClientModuleInjection";
import { ClientModuleEntity } from "../entities/ClientModuleEntity";
import { MenuModuleEntity } from "../entities/MenuModuleEntity";
import { RouteModuleEntity } from "../entities/RouteModuleEntity";
import { GetModuleRoutesUseCase } from "./GetModuleRoutesUseCase";
import { GetModulesUseCase } from "./GetModulesUseCase";
import { RegisterModulesUseCase } from "./RegisterModulesUseCase";
import { ValidateModulesUseCase } from "./ValidateModulesUseCase";
import { GetModuleMenusUseCase } from "./GetModuleMenusUseCase";

@injectable()
export class ModuleRegistryUseCase {
  private getModulesUseCase: GetModulesUseCase;
  private validateModulesUseCase: ValidateModulesUseCase;
  private registerModulesUseCase: RegisterModulesUseCase;
  private getModuleRoutesUseCase: GetModuleRoutesUseCase;
  private getModuleMenusUseCase: GetModuleMenusUseCase;

  constructor() {
    this.getModulesUseCase = ClientModuleInjection.getModulesUseCase();
    this.validateModulesUseCase =
      ClientModuleInjection.getValidateModulesUseCase();
    this.registerModulesUseCase =
      ClientModuleInjection.getRegisterModulesUseCase();
    this.getModuleRoutesUseCase = ClientModuleInjection.getModuleRoutesUseCase();
    this.getModuleMenusUseCase = ClientModuleInjection.getModuleMenusUseCase();
  }

  async getModules(): Promise<ClientModuleEntity[]> {
    return this.getModulesUseCase.execute();
  }

  validateModules(modules: ClientModuleEntity[]): ClientModuleEntity[] {
    return this.validateModulesUseCase.execute(modules);
  }

  async registerModules(): Promise<ClientModuleEntity[]> {
    return this.registerModulesUseCase.execute();
  }

  async getRoutes(): Promise<RouteModuleEntity[]> {
    return this.getModuleRoutesUseCase.execute();
  }

  async getMenus(): Promise<MenuModuleEntity[]> {
    return this.getModuleMenusUseCase.execute();
  }
}
