import { BasedApiResponseModel } from 'api/basedApiModel/BasedApiResponseModel';
import { injectable } from 'tsyringe';
import { ChatInjection } from '../../diInjection/ChatInjection';
import { ChatMessageRequestEntity } from '../entities/ChatMessageRequestEntity';
import { ChatMessageResponseEntity } from '../entities/ChatMessageResponseEntity';
import { IChatRepository } from '../repositories/IChatRepository';

@injectable()
export class ChatUseCase {
  private chatRepository: IChatRepository;

  constructor() {
    this.chatRepository = ChatInjection.getChatRepo();
  }

  private normalizeRequest(
    payload: ChatMessageRequestEntity,
  ): ChatMessageRequestEntity {
    return {
      ...payload,
      conversationId: ChatMessageRequestEntity.normalizeConversationId(
        payload.conversationId,
      ),
      content: payload.content?.trim(),
      limit: Math.min(Math.max(payload.limit || 50, 1), 100),
    };
  }

  async getMessages(
    params: ChatMessageRequestEntity,
  ): Promise<BasedApiResponseModel<Array<ChatMessageResponseEntity>>> {
    return this.chatRepository.getMessages(this.normalizeRequest(params));
  }

  async sendMessage(
    body: ChatMessageRequestEntity,
  ): Promise<BasedApiResponseModel<ChatMessageResponseEntity>> {
    const payload = this.normalizeRequest(body);

    if (!ChatMessageRequestEntity.hasValidContent(payload.content)) {
      return {
        code: -999,
        message: 'Message content is required',
        data: {},
      };
    }

    return this.chatRepository.sendMessage(payload);
  }
}
