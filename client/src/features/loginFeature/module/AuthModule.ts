import { ClientModuleEntity } from "@/appCore/modules/domain/entities/ClientModuleEntity";
import { RouteModuleEntity } from "@/appCore/modules/domain/entities/RouteModuleEntity";
import { lazy } from "react";
import { injectable } from "tsyringe";
import { AuthenInjection } from "../diInjection/AuthenInjection";
import { AuthenToken } from "../diInjection/AuthenToken";

@injectable()
export class AuthModule {
  private get authModule() {
    return new ClientModuleEntity({
      name: "LoginFeature",
      routes: [
        new RouteModuleEntity({
          key: "auth.main",
          path: "/login",
          component: lazy(
            () => import("features/loginFeature/presentation/views/LoginFeature"),
          ),
          token: AuthenToken.AuthenViewModel,
          isPrivate: true,
        }),
      ],
      register: () => AuthenInjection.injectAuthen(),
    });
  }

  public getAuthModule() {
    return this.authModule;
  }
}
