import { ChatToken } from "features/chatFeature/diInjection/ChatToken";
import NotFoundComponent from "generalComponents/notFoundComponent/NotFoundComponent";
import { ComponentType, FC, LazyExoticComponent, lazy } from "react";

export interface IClientPages {
  Component: LazyExoticComponent<FC<any> | ComponentType>;
  token?: symbol | string;
  addtionalProps?: unknown;
}

export class ClientPages {
  static PageKeys: Record<string, IClientPages> = {
    ChatFeature: {
      Component: lazy(
        () => import("features/chatFeature/presentation/view/ChatFeature"),
      ) as unknown as LazyExoticComponent<FC<any> | ComponentType>,
      token: ChatToken.ChatViewModel,
    },
  };

  static getPage(key: string): any {
    return this.PageKeys[key]?.Component || NotFoundComponent;
  }

  static getToken(key: string) {
    return this.PageKeys[key]?.token;
  }

  static getAddtionalProps(key: string) {
    return this.PageKeys[key]?.addtionalProps;
  }
}

export default ClientPages;
