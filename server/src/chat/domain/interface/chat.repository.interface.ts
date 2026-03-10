import { ChatMessage } from '../entity/chat-message.entity';

export interface IChatRepository {
  getMessages(conversationId: string, limit: number): Promise<ChatMessage[]>;
  createMessage(message: ChatMessage): Promise<ChatMessage>;
}
