import { ChatMessageResponseEntity } from '../../domain/entities/ChatMessageResponseEntity';

export class ChatMessageResponseModel implements ChatMessageResponseEntity {
  id?: string;
  conversationId?: string;
  senderId?: string;
  senderName?: string;
  content?: string;
  createdAt?: string;
}
