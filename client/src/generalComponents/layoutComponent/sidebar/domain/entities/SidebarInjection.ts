import { DependencyInjection } from "@/utils/di/DependecyInjection";
import { SidebarMenuConfigRepository } from "../../data/model/SidebarMenuConfigRepository";
import { IConfigRepository } from "../repositories/IConfigRepository";
import { SidebarUseCase } from "../useCases/SidebarUseCase";
import { SidebarToken } from "./SidebarToken";

export class SidebarInjection {
  static injectSidebarConfig() {
    DependencyInjection.register<IConfigRepository>(
      SidebarToken.IConfigRepository,
      SidebarMenuConfigRepository,
      "otherRepo",
    );
    DependencyInjection.register<SidebarUseCase>(
      SidebarToken.SidebarUseCase,
      SidebarUseCase,
      "otherRepo",
    );
  }

  static getSidebarRepo() {
    return DependencyInjection.getRepo<IConfigRepository>(
      SidebarToken.IConfigRepository,
    );
  }

  static getSidebarUseCase() {
    return DependencyInjection.getRepo<SidebarUseCase>(
      SidebarToken.SidebarUseCase,
    );
  }
}
