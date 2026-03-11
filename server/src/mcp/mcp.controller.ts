import { Body, Controller, Post } from '@nestjs/common';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Post()
  async handleRequest(
    @Body() request: { id?: string | number | null; method: string; params?: Record<string, unknown> },
  ) {
    return this.mcpService.handleRequest(request);
  }
}
