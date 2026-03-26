export class ClientModuleToken {
  static IModuleRegistryRepository = Symbol("IModuleRegistryRepository");
  static ModuleRegistryUseCase = Symbol("ModuleRegistryUseCase");
  static GetModulesUseCase = Symbol("GetModulesUseCase");
  static ValidateModulesUseCase = Symbol("ValidateModulesUseCase");
  static RegisterModulesUseCase = Symbol("RegisterModulesUseCase");
  static GetModuleRoutesUseCase = Symbol("GetModuleRoutesUseCase");
  static GetModuleMenusUseCase = Symbol("GetModuleMenusUseCase");
}
