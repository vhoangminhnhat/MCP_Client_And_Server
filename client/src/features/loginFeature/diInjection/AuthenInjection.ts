import { DependencyInjection } from "appCore/di/DependecyInjection";
import { AuthenImpl } from "../data/model/AuthenImpl";
import { IAuthenRepository } from "../domain/repositories/IAuthenRepository";
import { AuthenUseCase } from "../domain/useCases/AuthenUseCase";
import { AuthenViewModel } from "../presentation/viewModel/AuthenViewModel";
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

    DependencyInjection.register<AuthenViewModel>(
      AuthenToken.AuthenViewModel,
      AuthenViewModel,
      "viewModel",
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
