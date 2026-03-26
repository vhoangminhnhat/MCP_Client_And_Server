import { ClientModuleEntity } from "../entities/ClientModuleEntity";

export abstract class IModuleRegistryRepository {
  abstract getModules(): Promise<ClientModuleEntity[]>;
}
