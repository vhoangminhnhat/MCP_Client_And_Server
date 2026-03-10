import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { CreateMessageUseCase } from './application/create-message.usecase';
import { GetMessagesUseCase } from './application/get-messages.usecase';
import { ChatToken } from './domain/token/chat.repository.token';
import { ChatRepository } from './infrastructure/chat.repository';

@Module({
  controllers: [ChatController],
  providers: [
    CreateMessageUseCase,
    GetMessagesUseCase,
    {
      provide: ChatToken.CHAT_REPOSITORY,
      useClass: ChatRepository,
    },
  ],
})
export class ChatModule {}
