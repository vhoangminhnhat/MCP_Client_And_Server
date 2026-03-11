import { Injectable } from '@nestjs/common';
import { CreateMessageUseCase } from '@/chat/application/create-message.usecase';
import { GetMessagesUseCase } from '@/chat/application/get-messages.usecase';

interface JsonRpcRequest {
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

@Injectable()
export class McpService {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
  ) {}

  async handleRequest(request: JsonRpcRequest) {
    const { id = null, method, params = {} } = request;

    try {
      switch (method) {
        case 'initialize':
          return {
            jsonrpc: '2.0',
            id,
            result: {
              protocolVersion: '2025-03-26',
              serverInfo: {
                name: 'mcp-client-server',
                version: '1.0.0',
              },
              capabilities: {
                tools: {},
              },
            },
          };

        case 'tools/list':
          return {
            jsonrpc: '2.0',
            id,
            result: {
              tools: [
                {
                  name: 'chat.get_messages',
                  description: 'Get chat messages from a conversation.',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      conversationId: { type: 'string' },
                      limit: { type: 'number' },
                    },
                  },
                },
                {
                  name: 'chat.send_message',
                  description: 'Send a message into a conversation.',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      conversationId: { type: 'string' },
                      senderId: { type: 'string' },
                      senderName: { type: 'string' },
                      content: { type: 'string' },
                    },
                    required: ['content'],
                  },
                },
              ],
            },
          };

        case 'tools/call': {
          const toolName = String(params.name || '');
          const argumentsPayload =
            (params.arguments as Record<string, unknown>) || {};

          if (toolName === 'chat.get_messages') {
            const response = await this.getMessagesUseCase.execute(
              String(argumentsPayload.conversationId || 'global'),
              Number(argumentsPayload.limit || 50),
            );

            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(response.data || []),
                  },
                ],
              },
            };
          }

          if (toolName === 'chat.send_message') {
            const response = await this.createMessageUseCase.execute({
              conversationId: String(argumentsPayload.conversationId || 'global'),
              senderId: String(argumentsPayload.senderId || 'mcp-tool'),
              senderName: String(argumentsPayload.senderName || 'MCP Tool'),
              content: String(argumentsPayload.content || ''),
            });

            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(response.data || {}),
                  },
                ],
              },
            };
          }

          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: `Unknown tool: ${toolName}`,
            },
          };
        }

        default:
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          };
      }
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32000,
          message: (error as Error)?.message || 'Internal MCP error',
        },
      };
    }
  }
}
