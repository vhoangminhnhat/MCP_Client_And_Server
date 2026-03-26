import { injectable } from "tsyringe";
import { ClientModuleInjection } from "../../di/ClientModuleInjection";
import { RouteModuleEntity } from "../entities/RouteModuleEntity";
import { IModuleRegistryRepository } from "../repositories/IModuleRegistyRepository";
import { ValidateModulesUseCase } from "./ValidateModulesUseCase";

@injectable()
export class GetModuleRoutesUseCase {
  private moduleRegistryRepository: IModuleRegistryRepository;
  private validateModulesUseCase: ValidateModulesUseCase;

  constructor() {
    this.moduleRegistryRepository =
      ClientModuleInjection.getModuleRegistryRepository();
    this.validateModulesUseCase =
      ClientModuleInjection.getValidateModulesUseCase();
  }

  async execute(): Promise<RouteModuleEntity[]> {
    const modules = await this.moduleRegistryRepository.getModules();
    this.validateModulesUseCase.execute(modules);
    return modules.flatMap((module) => module.routes || []);
  }
}
