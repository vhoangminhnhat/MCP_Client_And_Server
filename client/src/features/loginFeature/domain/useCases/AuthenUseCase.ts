import { BasedApiResponseModel } from "appCore/basedModel/basedApiModel/BasedApiResponseModel";
import { strings } from "utils/localizedStrings";
import { injectable } from "tsyringe";
import { AuthenRequestModel } from "../../data/dto/AuthenRequestModel";
import { AuthenReponseEntity } from "../entities/AuthenResponseEntity";
import { AuthenEntity } from "../entities/AuthenEntity";
import { IAuthenRepository } from "../repositories/IAuthenRepository";
import { AuthenInjection } from "../../diInjection/AuthenInjection";

@injectable()
export class AuthenUseCase {
  private authenRepository: IAuthenRepository;

  constructor() {
    this.authenRepository = AuthenInjection.getAuthenRepo();
  }

  async login(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenReponseEntity>> {
    const isValidateEmail = AuthenEntity.checkEmail(body?.email || "");
    if (isValidateEmail) {
      return await this.authenRepository.login(body);
    } else {
      return {
        message: strings.GlobalMessage.Email,
        data: {},
        code: -999,
      };
    }
  }

  async singUp(
    body: AuthenRequestModel,
  ): Promise<BasedApiResponseModel<AuthenReponseEntity>> {
    const isValidatePassword = AuthenEntity.validatePassword(
      body?.password || "",
    );
    const isValidateEmail = AuthenEntity.checkEmail(body?.email || "");
    if (isValidatePassword && isValidateEmail) {
      return await this.authenRepository.singUp(body);
    } else {
      return {
        message: strings.GlobalMessage.Error,
        data: {},
        code: -999,
      };
    }
  }
}
