import { AuthenApiPath } from "@/api/apiPaths";
import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import client from "@/api/client";
import { injectable } from "tsyringe";
import { AuthenEntity } from "../../domain/entities/AuthenEntity";
import { IAuthenRepository } from "../../domain/repositories/IAuthenRepository";
import { AuthenRequestModel } from "../dto/AuthenRequestModel";

@injectable()
export class AuthenImpl implements IAuthenRepository {
  async login(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenEntity>> {
    return client?.post(AuthenApiPath.login, body);
  }

  async singUp(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenEntity>> {
    return client?.post(AuthenApiPath.signUp, body);
  }
}
