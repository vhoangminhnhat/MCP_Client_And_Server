import { BasedApiResponseModel } from "appCore/basedModel/basedApiModel/BasedApiResponseModel";
import { SidebarMenuConfigModel } from "../../data/dto/SidebarMenuConfigModel";

export interface IConfigRepository {
  getSidebarMenu(
    role: boolean,
    language?: string,
  ): Promise<BasedApiResponseModel<SidebarMenuConfigModel>>;
}
