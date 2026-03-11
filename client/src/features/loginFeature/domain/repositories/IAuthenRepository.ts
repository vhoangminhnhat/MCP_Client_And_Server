import { BasedApiResponseModel } from "api/basedApiModel/BasedApiResponseModel";
import { AuthenRequestModel } from "../../data/dto/AuthenRequestModel";
import { AuthenReponseEntity } from "../entities/AuthenResponseEntity";

export interface IAuthenRepository {
  login(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenReponseEntity>>;
  singUp(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenReponseEntity>>;
}
