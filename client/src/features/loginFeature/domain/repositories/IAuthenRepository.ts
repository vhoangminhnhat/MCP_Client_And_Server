import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import { AuthenRequestModel } from "../../data/dto/AuthenRequestModel";
import { AuthenEntity } from "../entities/AuthenEntity";

export interface IAuthenRepository {
  login(body: AuthenRequestModel): Promise<BasedApiResponseModel<AuthenEntity>>;
  singUp(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenEntity>>;
}
