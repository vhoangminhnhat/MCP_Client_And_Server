import { BasedApiResponseModel } from "@/api/basedApiModel/BasedApiResponseModel";
import { AuthenInjection } from "../../data/diInjection/AuthenInjection";
import { AuthenRequestModel } from "../../data/dto/AuthenRequestModel";
import { AuthenEntity } from "../entities/AuthenEntity";
import { IAuthenRepository } from "../repositories/IAuthenRepository";
import { injectable } from "tsyringe";

@injectable()
export class AuthenUseCase {
  private authenRepository: IAuthenRepository;

  constructor() {
    this.authenRepository = AuthenInjection.getAuthenRepo();
  }

  async login(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenEntity>> {
    const isValidateEmail = AuthenEntity.checkEmail(body?.email || "");
    if (isValidateEmail) {
      return await this.authenRepository.login(body);
    } else {
      return {};
    }
  }

  async singUp(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenEntity>> {
    const isValidatePassword = AuthenEntity.validatePassword(
      body?.password || "",
    );
    const isValidateEmail = AuthenEntity.checkEmail(body?.email || "");
    if (isValidatePassword && isValidateEmail) {
      return await this.authenRepository.singUp(body);
    } else {
      return {};
    }
  }
}
