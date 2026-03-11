# MCP Client And Server

Full-stack TypeScript workspace with:
- `client`: React + MVVM + Clean Architecture.
- `server`: NestJS + Prisma + Clean Architecture.

## P0 Scope Completed
- Login/Sign-up flow wired end-to-end.
- Chat API + Chat UI flow wired end-to-end.
- JWT guard for chat endpoints.
- API contracts standardized as `{ code, message, data }`.
- MCP core endpoint (`/api/v1/mcp`) with JSON-RPC methods:
  - `initialize`
  - `tools/list`
  - `tools/call`

## Quick Start

### 1) Install deps
```bash
npm install
```

### 2) Environment

Client (`client/.env`):
```env
REACT_APP_BASE_URL=http://localhost:3000
```

Server (`server/.env`):
```env
DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/<db>
JWT_SECRET=super-secret-key
PORT=3000
```

### 3) Prisma migration flow
```bash
# Generate Prisma client
npm --workspace server exec prisma generate

# Create/apply migration in local dev
npm --workspace server exec prisma migrate dev --name init

# (CI/Prod) apply migrations
npm --workspace server exec prisma migrate deploy
```

### 4) Run server/client
```bash
npm --workspace server run start:dev
npm --workspace client run start
```

## API Contract
- Base prefix: `/api/v1`
- Auth:
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/sign-up`
- Chat (JWT required):
  - `GET /api/v1/chat/messages`
  - `POST /api/v1/chat/messages`
- MCP:
  - `POST /api/v1/mcp`

## Minimal MCP Request Examples

`initialize`
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {}
}
```

`tools/list`
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}
```

`tools/call` (`chat.send_message`)
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "chat.send_message",
    "arguments": {
      "conversationId": "global",
      "senderId": "assistant",
      "senderName": "Assistant",
      "content": "Hello from MCP"
    }
  }
}
```
