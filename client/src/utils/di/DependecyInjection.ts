import { SidebarInjection } from "@/generalComponents/layoutComponent/sidebar/domain/entities/SidebarInjection";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";

export class DependencyInjection {
  static alreadyInjected: boolean = false;
  static registeredToken: Array<string | symbol> = [];
  static resolvedToken: Map<string | symbol, any> = new Map();

  static register<T>(
    token: string | symbol,
    implClass: constructor<T>,
    type: "viewModel" | "otherRepo",
  ) {
    if (!container.isRegistered(token)) {
      container.register<T>(token, { useClass: implClass });
      if (type === "otherRepo") {
        this.registeredToken.push(token);
      }
    }
  }

  private static registerAllTokens() {
    SidebarInjection.injectSidebarConfig();
  }

  private static checkInjectionAndResolve() {
    this.registeredToken.forEach((token) => {
      if (!container.isRegistered(token)) {
        throw new Error(`Unregistered token: ${String(token.toString())}`);
      }

      const dependency = container.resolve(token);
      this.resolvedToken.set(token, dependency);
    });
  }

  static lateResolution<T>(token: string | symbol): T {
    if (!token) {
      throw new Error("lateResolution: token is undefined");
    }
    if (!container.isRegistered(token)) {
      throw new Error(`Unregistered token: ${String(token.toString())}`);
    }
    const singleDependency = container.resolve(token);
    return singleDependency as unknown as T;
  }

  static async initInjections() {
    if (this.alreadyInjected) return;
    this.registerAllTokens();
    this.checkInjectionAndResolve();
  }

  static getRepo<T>(token: string | symbol): T {
    const dependency = this.resolvedToken.get(token);
    if (!dependency) {
      throw new Error(`Token ${String(token.toString())} not found`);
    }
    return dependency;
  }
}
