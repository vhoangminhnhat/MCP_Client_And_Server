import { DependencyInjection } from "@/appCore/di/DependecyInjection";
import { ModuleRegistryImpl } from "../data/ModuleRegistryImpl";
import { IModuleRegistryRepository } from "../domain/repositories/IModuleRegistyRepository";
import { GetModuleRoutesUseCase } from "../domain/useCases/GetModuleRoutesUseCase";
import { GetModulesUseCase } from "../domain/useCases/GetModulesUseCase";
import { ModuleRegistryUseCase } from "../domain/useCases/ModuleRegistryUseCase";
import { RegisterModulesUseCase } from "../domain/useCases/RegisterModulesUseCase";
import { ValidateModulesUseCase } from "../domain/useCases/ValidateModulesUseCase";
import { ClientModuleToken } from "./ClientModuleToken";
import { GetModuleMenusUseCase } from "../domain/useCases/GetModuleMenusUseCase";

export class ClientModuleInjection {
  static initInjections() {
    DependencyInjection.register<IModuleRegistryRepository>(
      ClientModuleToken.IModuleRegistryRepository,
      ModuleRegistryImpl,
      "otherRepo",
    );

    DependencyInjection.register<GetModulesUseCase>(
      ClientModuleToken.GetModulesUseCase,
      GetModulesUseCase,
      "otherRepo",
    );

    DependencyInjection.register<ValidateModulesUseCase>(
      ClientModuleToken.ValidateModulesUseCase,
      ValidateModulesUseCase,
      "otherRepo",
    );

    DependencyInjection.register<RegisterModulesUseCase>(
      ClientModuleToken.RegisterModulesUseCase,
      RegisterModulesUseCase,
      "otherRepo",
    );

    DependencyInjection.register<GetModuleRoutesUseCase>(
      ClientModuleToken.GetModuleRoutesUseCase,
      GetModuleRoutesUseCase,
      "otherRepo",
    );

    DependencyInjection.register<GetModuleMenusUseCase>(
      ClientModuleToken.GetModuleMenusUseCase,
      GetModuleMenusUseCase,
      "otherRepo",
    );

    DependencyInjection.register<ModuleRegistryUseCase>(
      ClientModuleToken.ModuleRegistryUseCase,
      ModuleRegistryUseCase,
      "otherRepo",
    );
  }

  static getModuleRegistryRepository() {
    return DependencyInjection.getRepo<IModuleRegistryRepository>(
      ClientModuleToken.IModuleRegistryRepository,
    );
  }

  static getModuleRegistryUseCase() {
    return DependencyInjection.getRepo<ModuleRegistryUseCase>(
      ClientModuleToken.ModuleRegistryUseCase,
    );
  }

  static getModulesUseCase() {
    return DependencyInjection.getRepo<GetModulesUseCase>(
      ClientModuleToken.GetModulesUseCase,
    );
  }

  static getValidateModulesUseCase() {
    return DependencyInjection.getRepo<ValidateModulesUseCase>(
      ClientModuleToken.ValidateModulesUseCase,
    );
  }

  static getRegisterModulesUseCase() {
    return DependencyInjection.getRepo<RegisterModulesUseCase>(
      ClientModuleToken.RegisterModulesUseCase,
    );
  }

  static getModuleRoutesUseCase() {
    return DependencyInjection.getRepo<GetModuleRoutesUseCase>(
      ClientModuleToken.GetModuleRoutesUseCase,
    );
  }

  static getModuleMenusUseCase() {
    return DependencyInjection.getRepo<GetModuleMenusUseCase>(
      ClientModuleToken.GetModuleMenusUseCase,
    );
  }
}
