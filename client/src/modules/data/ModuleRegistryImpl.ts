import { ChatModule } from "features/chatFeature/module/ChatModule";
import { AuthModule } from "features/loginFeature/module/AuthModule";
import { injectable } from "tsyringe";
import { ClientModuleEntity } from "../domain/entities/ClientModuleEntity";
import { IModuleRegistryRepository } from "../domain/repositories/IModuleRegistyRepository";

@injectable()
export class ModuleRegistryImpl implements IModuleRegistryRepository {
  private chatModule: ChatModule;
  private authModule: AuthModule;

  constructor() {
    this.chatModule = new ChatModule();
    this.authModule = new AuthModule();
  }
  async getModules(): Promise<ClientModuleEntity[]> {
    return [this.chatModule.getChatModule(), this.authModule.getAuthModule()];
  }
}
