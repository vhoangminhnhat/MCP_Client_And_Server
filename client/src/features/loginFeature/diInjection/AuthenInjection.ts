import { DependencyInjection } from "@/utils/di/DependecyInjection";
import { AuthenImpl } from "../data/model/AuthenImpl";
import { IAuthenRepository } from "../domain/repositories/IAuthenRepository";
import { AuthenUseCase } from "../domain/useCases/AuthenUseCase";
import { AuthenToken } from "./AuthenToken";

export class AuthenInjection {
  static injectAuthen() {
    DependencyInjection.register<IAuthenRepository>(
      AuthenToken.IAuthenRepository,
      AuthenImpl,
      "otherRepo",
    );

    DependencyInjection.register<AuthenUseCase>(
      AuthenToken.AuthenUseCase,
      AuthenUseCase,
      "otherRepo",
    );
  }

  static getAuthenRepo() {
    return DependencyInjection.getRepo<IAuthenRepository>(
      AuthenToken.IAuthenRepository,
    );
  }

  static getAuthenUseCase() {
    return DependencyInjection.getRepo<AuthenUseCase>(
      AuthenToken.AuthenUseCase,
    );
  }
}
