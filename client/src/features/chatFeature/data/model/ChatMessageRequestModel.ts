import { ChatMessageRequestEntity } from '../../domain/entities/ChatMessageRequestEntity';

export class ChatMessageRequestModel implements ChatMessageRequestEntity {
  conversationId?: string;
  senderId?: string;
  senderName?: string;
  content?: string;
  limit?: number;
}
