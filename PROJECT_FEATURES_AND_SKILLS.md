# MCP Client/Server - Feature Notes for Resume

## Core Features
- Authentication module (sign up/login) with JWT token issuing.
- Role-aware navigation/menu loading on client.
- Dependency Injection-based feature wiring (tsyringe on client, Nest provider tokens on server).
- Chat feature implemented end-to-end:
  - Server APIs: `GET /chat/messages`, `POST /chat/messages`.
  - Prisma data model for chat message persistence.
  - Client MVVM flow with reactive streams (`BehaviorSubject`) for load/send/error state.
  - Chat UI with message list, send message action, and loading/error handling.
- Clean Architecture separation by layers:
  - `domain` (entities, repository contracts, use cases)
  - `data`/`infrastructure` (API + DB implementations)
  - `presentation` (view + viewModel)
  - `di` (token/injection wiring)

## Tech Skills Demonstrated
- Frontend: React + TypeScript, class-based MVVM pattern, RxJS, Ant Design, routing, dependency injection (`tsyringe`).
- Frontend Architecture: Clean Architecture, OOP, feature modularization, repository/usecase pattern.
- Backend: NestJS + TypeScript, modular architecture, use-case driven application layer, token-based DI.
- Data Layer: Prisma ORM with PostgreSQL schema modeling.
- Auth/Security: JWT authentication, password hashing (`bcrypt`).
- API Design: RESTful endpoint design and DTO validation.
- Engineering Practices: Separation of concerns, layered contracts via interfaces, reusable base view/viewModel abstractions.
