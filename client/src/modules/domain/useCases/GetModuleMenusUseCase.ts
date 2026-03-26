import { ClientModuleInjection } from "@/modules/di/ClientModuleInjection";
import { injectable } from "tsyringe";
import { IModuleRegistryRepository } from "../repositories/IModuleRegistyRepository";
import { ValidateModulesUseCase } from "./ValidateModulesUseCase";
import { MenuModuleEntity } from "../entities/MenuModuleEntity";

@injectable()
export class GetModuleMenusUseCase {
  private moduleRegistryRepository: IModuleRegistryRepository;
  private validateModulesUseCase: ValidateModulesUseCase;

  constructor() {
    this.moduleRegistryRepository =
      ClientModuleInjection.getModuleRegistryRepository();
    this.validateModulesUseCase = new ValidateModulesUseCase();
  }

  async execute(): Promise<MenuModuleEntity[]> {
    const modules = await this.moduleRegistryRepository.getModules();
    this.validateModulesUseCase.execute(modules);
    return modules.flatMap((module) => module.menuItems || []);
  }
}