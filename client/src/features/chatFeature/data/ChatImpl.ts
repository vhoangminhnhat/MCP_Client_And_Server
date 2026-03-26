import { ChatApiPath } from 'api/apiPaths';
import { BasedApiResponseModel } from 'appCore/basedModel/basedApiModel/BasedApiResponseModel';
import client from 'api/client';
import { injectable } from 'tsyringe';
import { ChatMessageRequestModel } from './model/ChatMessageRequestModel';
import { ChatMessageResponseModel } from './model/ChatMessageResponseModel';
import { IChatRepository } from '../domain/repositories/IChatRepository';

@injectable()
export class ChatImpl implements IChatRepository {
  async getMessages(
    params: ChatMessageRequestModel,
  ): Promise<BasedApiResponseModel<Array<ChatMessageResponseModel>>> {
    return client.get(ChatApiPath.messages, params);
  }

  async sendMessage(
    body: ChatMessageRequestModel,
  ): Promise<BasedApiResponseModel<ChatMessageResponseModel>> {
    return client.post(ChatApiPath.messages, body);
  }
}
