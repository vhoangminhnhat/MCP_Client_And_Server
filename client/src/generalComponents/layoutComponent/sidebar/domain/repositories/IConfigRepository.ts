import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import { SidebarMenuConfigModel } from "../../data/dto/SidebarMenuConfigModel";

export interface IConfigRepository {
  getSidebarMenu(
    role: boolean,
    language?: string,
  ): Promise<BasedApiResponseModel<SidebarMenuConfigModel>>;
}
