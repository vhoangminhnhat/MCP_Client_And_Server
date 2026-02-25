import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import { injectable } from "tsyringe";
import { SidebarMenuConfigModel } from "../../data/dto/SidebarMenuConfigModel";
import { SidebarInjection } from "../entities/SidebarInjection";
import { IConfigRepository } from "../repositories/IConfigRepository";

@injectable()
export class SidebarUseCase {
  private sidebarRepository: IConfigRepository;

  constructor() {
    this.sidebarRepository = SidebarInjection.getSidebarRepo();
  }

  async getSidebarMenu(
    role: boolean,
    language?: string,
  ): Promise<BasedApiResponseModel<SidebarMenuConfigModel>> {
    return await this.sidebarRepository.getSidebarMenu(role, language);
  }
}
