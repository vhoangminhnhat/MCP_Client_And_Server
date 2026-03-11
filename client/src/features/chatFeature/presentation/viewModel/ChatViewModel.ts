import { Error } from 'api/basedApiModel/BasedApiResponseModel';
import { BasedViewModel } from 'utils/basedModel/BasedViewModel';
import { BehaviorSubject } from 'rxjs';
import { injectable } from 'tsyringe';
import { ChatInjection } from '../../diInjection/ChatInjection';
import { ChatMessageRequestEntity } from '../../domain/entities/ChatMessageRequestEntity';
import { ChatMessageResponseEntity } from '../../domain/entities/ChatMessageResponseEntity';
import { ChatUseCase } from '../../domain/useCases/ChatUseCase';

export class ChatInput implements Disposable {
  public loading = new BehaviorSubject<boolean>(false);
  public loadMessages = new BehaviorSubject<ChatMessageRequestEntity>({
    conversationId: 'global',
    limit: 50,
  });
  public sendMessage = new BehaviorSubject<ChatMessageRequestEntity>({});

  [Symbol.dispose](): void {
    this.loading.complete();
    this.loadMessages.complete();
    this.sendMessage.complete();
  }
}

export class ChatOutput implements Disposable {
  public onMessagesLoaded = new BehaviorSubject<Array<ChatMessageResponseEntity>>(
    [],
  );
  public onMessageSent = new BehaviorSubject<ChatMessageResponseEntity | undefined>(
    undefined,
  );
  public onError = new BehaviorSubject<Error>({});

  [Symbol.dispose](): void {
    this.onMessagesLoaded.complete();
    this.onMessageSent.complete();
    this.onError.complete();
  }
}

@injectable()
export class ChatViewModel extends BasedViewModel<ChatInput, ChatOutput> {
  private chatUseCase: ChatUseCase;

  constructor() {
    super(new ChatInput(), new ChatOutput());
    this.chatUseCase = ChatInjection.getChatUseCase();
  }

  protected override transform(): void {
    this.skipFirstInitial(this.input.loadMessages, async (params) => {
      this.input.loading.next(true);
      try {
        const response = await this.chatUseCase.getMessages(params);
        this.output.onMessagesLoaded.next(response?.data || []);
      } catch (error) {
        this.output.onError.next((error || {}) as Error);
      } finally {
        this.input.loading.next(false);
      }
    });

    this.skipFirstInitial(this.input.sendMessage, async (body) => {
      this.input.loading.next(true);
      try {
        const response = await this.chatUseCase.sendMessage(body);

        if (response?.data && response?.code !== -999) {
          this.output.onMessageSent.next(response.data);
        } else {
          this.output.onError.next({
            code: response?.code,
            message: response?.message || 'Unable to send message',
          });
        }
      } catch (error) {
        this.output.onError.next((error || {}) as Error);
      } finally {
        this.input.loading.next(false);
      }
    });
  }
}
