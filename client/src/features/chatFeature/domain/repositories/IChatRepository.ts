import { BasedApiResponseModel } from '@/appCore/basedModel/basedApiModel/BasedApiResponseModel';
import { ChatMessageRequestEntity } from '../entities/ChatMessageRequestEntity';
import { ChatMessageResponseEntity } from '../entities/ChatMessageResponseEntity';

export interface IChatRepository {
  getMessages(
    params: ChatMessageRequestEntity,
  ): Promise<BasedApiResponseModel<Array<ChatMessageResponseEntity>>>;
  sendMessage(
    body: ChatMessageRequestEntity,
  ): Promise<BasedApiResponseModel<ChatMessageResponseEntity>>;
}
