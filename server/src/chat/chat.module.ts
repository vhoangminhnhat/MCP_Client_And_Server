import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ChatController } from './chat.controller';
import { CreateMessageUseCase } from './application/create-message.usecase';
import { GetMessagesUseCase } from './application/get-messages.usecase';
import { ChatToken } from './domain/token/chat.repository.token';
import { ChatRepository } from './infrastructure/chat.repository';

@Module({
  imports: [AuthModule],
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
