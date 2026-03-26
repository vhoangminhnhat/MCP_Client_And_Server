import { injectable } from "tsyringe";
import { ClientModuleInjection } from "../../di/ClientModuleInjection";
import { ClientModuleEntity } from "../entities/ClientModuleEntity";
import { IModuleRegistryRepository } from "../repositories/IModuleRegistyRepository";

@injectable()
export class GetModulesUseCase {
  private moduleRegistryRepository: IModuleRegistryRepository;

  constructor() {
    this.moduleRegistryRepository =
      ClientModuleInjection.getModuleRegistryRepository();
  }

  async execute(): Promise<ClientModuleEntity[]> {
    return this.moduleRegistryRepository.getModules();
  }
}
