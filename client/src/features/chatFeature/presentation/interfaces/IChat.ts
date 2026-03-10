import { ChatMessageResponseEntity } from '../../domain/entities/ChatMessageResponseEntity';

export interface IChatFeature {
  conversationId?: string;
}

export interface IChatState {
  loading: boolean;
  draft: string;
  messages: Array<ChatMessageResponseEntity>;
}
