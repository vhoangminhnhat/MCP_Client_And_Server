import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateMessageUseCase } from './application/create-message.usecase';
import { GetMessagesUseCase } from './application/get-messages.usecase';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { GetChatMessagesDto } from './dto/get-chat-messages.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
  ) {}

  @Get('messages')
  async getMessages(@Query() query: GetChatMessagesDto) {
    const parsedLimit = Number.parseInt(query.limit || '50', 10);
    return this.getMessagesUseCase.execute(query.conversationId, parsedLimit);
  }

  @Post('messages')
  async createMessage(@Body() dto: CreateChatMessageDto) {
    return this.createMessageUseCase.execute(dto);
  }
}
