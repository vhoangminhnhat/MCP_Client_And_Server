import { BasedViews, IBasedViews } from "appCore/basedModel/BasedViews";
import { Button, Card, Input, List, Spin, Typography } from "antd";
import { IAuthenticationContext } from "context/interface/IAuthenticationContext";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { ChangeEvent, ReactNode } from "react";
import { ClientHelpers } from "utils/helpers";
import { ChatMessageResponseEntity } from "../../domain/entities/ChatMessageResponseEntity";
import { IChatFeature, IChatState } from "../interfaces/IChat";
import { ChatViewModel } from "../viewModel/ChatViewModel";

const DEFAULT_CONVERSATION_ID = "global";

export default class ChatFeature extends BasedViews<
  ChatViewModel,
  IChatFeature,
  IChatState
> {
  constructor(props: IBasedViews & IChatFeature) {
    super(props);

    this.state = {
      loading: false,
      draft: "",
      messages: [],
    };

    this.onChangeDraft = this.onChangeDraft.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  protected override bindViewModel(): void {
    super.bindViewModel();

    this.subscribeToVM(this.viewModel.input.loading, (loading) => {
      this.setState({ loading });
    });

    this.subscribeToVM(this.viewModel.output.onMessagesLoaded, (messages) => {
      this.setState({ messages });
    });

    this.subscribeToVM(this.viewModel.output.onMessageSent, (message) => {
      if (!message) return;
      this.setState((prevState) => ({
        draft: "",
        messages: [...prevState.messages, message],
      }));
    });

    this.subscribeToVM(this.viewModel.output.onError, (error) => {
      if (!isEmpty(error?.message)) {
        ClientHelpers.getMessage(error.message as string, 2, "error");
      }
    });

    this.connectToVM(this.viewModel.input.loadMessages, {
      conversationId: this.props.conversationId || DEFAULT_CONVERSATION_ID,
      limit: 50,
    });
  }

  private onChangeDraft(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ draft: event.target.value });
  }

  private onSendMessage() {
    const content = this.state.draft?.trim();

    if (!content) {
      return;
    }

    const { userInfo } = (this.context || {}) as IAuthenticationContext;
    const senderName = String(
      userInfo?.email || userInfo?.id || "Current User",
    );
    const senderId = String(userInfo?.id || senderName);

    this.connectToVM(this.viewModel.input.sendMessage, {
      conversationId: this.props.conversationId || DEFAULT_CONVERSATION_ID,
      senderId,
      senderName,
      content,
    });
  }

  private renderMessage(message: ChatMessageResponseEntity) {
    return (
      <List.Item key={message.id}>
        <List.Item.Meta
          title={
            <div className="flex justify-between items-center">
              <Typography.Text strong>
                {message.senderName || "Unknown"}
              </Typography.Text>
              <Typography.Text type="secondary">
                {message.createdAt
                  ? dayjs(message.createdAt).format("HH:mm DD/MM/YYYY")
                  : "--"}
              </Typography.Text>
            </div>
          }
          description={message.content || ""}
        />
      </List.Item>
    );
  }

  render(): ReactNode {
    const { loading, draft, messages } = this.state;

    return (
      <section className="p-4 xl:p-6">
        <Card title="Team Chat" bordered={false}>
          <Spin spinning={loading}>
            <List
              className="mb-4"
              locale={{ emptyText: "No messages yet" }}
              dataSource={messages}
              renderItem={this.renderMessage}
              style={{ maxHeight: 420, overflow: "auto" }}
            />
            <Input.TextArea
              placeholder="Type your message..."
              value={draft}
              onChange={this.onChangeDraft}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="mt-3 flex justify-end">
              <Button
                type="primary"
                onClick={this.onSendMessage}
                disabled={loading}
              >
                Send
              </Button>
            </div>
          </Spin>
        </Card>
      </section>
    );
  }
}
