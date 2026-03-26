import { injectable } from "tsyringe";
import { ClientModuleInjection } from "../../di/ClientModuleInjection";
import { MenuModuleEntity } from "../entities/MenuModuleEntity";
import { IModuleRegistryRepository } from "../repositories/IModuleRegistyRepository";
import { ValidateModulesUseCase } from "./ValidateModulesUseCase";

@injectable()
export class GetModuleMenusUseCase {
  private moduleRegistryRepository: IModuleRegistryRepository;
  private validateModulesUseCase: ValidateModulesUseCase;

  constructor() {
    this.moduleRegistryRepository =
      ClientModuleInjection.getModuleRegistryRepository();
    this.validateModulesUseCase =
      ClientModuleInjection.getValidateModulesUseCase();
  }

  async execute(): Promise<MenuModuleEntity[]> {
    const modules = await this.moduleRegistryRepository.getModules();
    this.validateModulesUseCase.execute(modules);
    return modules.flatMap((module) => module.menuItems || []);
  }
}
