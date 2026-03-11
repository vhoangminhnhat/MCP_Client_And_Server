import { Module } from '@nestjs/common';
import { ChatModule } from '@/chat/chat.module';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';

@Module({
  imports: [ChatModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
