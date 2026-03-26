import { DependencyInjection } from "appCore/di/DependecyInjection";
import { ChatImpl } from "../data/ChatImpl";
import { IChatRepository } from "../domain/repositories/IChatRepository";
import { ChatUseCase } from "../domain/useCases/ChatUseCase";
import { ChatViewModel } from "../presentation/viewModel/ChatViewModel";
import { ChatToken } from "./ChatToken";

export class ChatInjection {
  static injectChat() {
    DependencyInjection.register<IChatRepository>(
      ChatToken.IChatRepository,
      ChatImpl,
      "otherRepo",
    );

    DependencyInjection.register<ChatUseCase>(
      ChatToken.ChatUseCase,
      ChatUseCase,
      "otherRepo",
    );

    DependencyInjection.register<ChatViewModel>(
      ChatToken.ChatViewModel,
      ChatViewModel,
      "viewModel",
    );
  }

  static getChatRepo() {
    return DependencyInjection.getRepo<IChatRepository>(
      ChatToken.IChatRepository,
    );
  }

  static getChatUseCase() {
    return DependencyInjection.getRepo<ChatUseCase>(ChatToken.ChatUseCase);
  }
}
