export class ChatMessageRequestEntity {
  conversationId?: string;
  senderId?: string;
  senderName?: string;
  content?: string;
  limit?: number;

  static normalizeConversationId(value?: string) {
    return value?.trim() || 'global';
  }

  static hasValidContent(value?: string) {
    return Boolean(value?.trim());
  }
}
