import { injectable } from "tsyringe";
import { ClientModuleInjection } from "../../di/ClientModuleInjection";
import { ClientModuleEntity } from "../entities/ClientModuleEntity";
import { IModuleRegistryRepository } from "../repositories/IModuleRegistyRepository";
import { ValidateModulesUseCase } from "./ValidateModulesUseCase";

@injectable()
export class RegisterModulesUseCase {
  private moduleRegistryRepository: IModuleRegistryRepository;
  private validateModulesUseCase: ValidateModulesUseCase;

  constructor() {
    this.moduleRegistryRepository =
      ClientModuleInjection.getModuleRegistryRepository();
    this.validateModulesUseCase =
      ClientModuleInjection.getValidateModulesUseCase();
  }

  async execute(): Promise<ClientModuleEntity[]> {
    const modules = await this.moduleRegistryRepository.getModules();
    this.validateModulesUseCase.execute(modules);
    modules.forEach((module) => module.register?.());
    return modules;
  }
}
