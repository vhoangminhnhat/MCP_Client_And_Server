import { Inject, Injectable } from '@nestjs/common';
import { IChatRepository } from '../domain/interface/chat.repository.interface';
import { ChatToken } from '../domain/token/chat.repository.token';

@Injectable()
export class GetMessagesUseCase {
  constructor(
    @Inject(ChatToken.CHAT_REPOSITORY)
    private readonly chatRepository: IChatRepository,
  ) {}

  async execute(conversationId = 'global', limit = 50) {
    const validLimit = Number.isNaN(limit)
      ? 50
      : Math.min(Math.max(limit, 1), 100);

    return this.chatRepository.getMessages(conversationId, validLimit);
  }
}
