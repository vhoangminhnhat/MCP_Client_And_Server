import { MessageOutlined } from "@ant-design/icons";
import { ClientModuleEntity } from "@/modules/domain/entities/ClientModuleEntity";
import { MenuModuleEntity } from "@/modules/domain/entities/MenuModuleEntity";
import { RouteModuleEntity } from "@/modules/domain/entities/RouteModuleEntity";
import { lazy } from "react";
import { injectable } from "tsyringe";
import { ChatInjection } from "../diInjection/ChatInjection";
import { ChatToken } from "../diInjection/ChatToken";

@injectable()
export class ChatModule {
  private get chatModule() {
    return new ClientModuleEntity({
      name: "ChatFeature",
      routes: [
        new RouteModuleEntity({
          key: "chat.main",
          path: "/chat",
          component: lazy(
            () =>
              import("@/features/chatFeature/presentation/view/ChatFeature"),
          ),
          token: ChatToken.ChatViewModel,
          isPrivate: true,
        }),
      ],
      menuItems: [
        new MenuModuleEntity({
          name: "Chat",
          routeKey: "chat.main",
          featureKey: [],
          enable: true,
          path: "/chat",
          icon: <MessageOutlined />,
        }),
      ],
      register: () => ChatInjection.injectChat(),
    });
  }

  public getChatModule() {
    return this.chatModule;
  }
}
