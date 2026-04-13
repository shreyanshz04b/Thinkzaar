# Thinkzaar — Crowd-Powered Problem Solving Marketplace

Production-grade platform for collaborative problem solving.

## Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Three.js
- **Backend:** NestJS, PostgreSQL, Prisma, Redis
- **AI:** Local embeddings via Xenova Transformers
- **Real-time:** WebSockets (Socket.io)
- **Security:** JWT + Refresh tokens, Argon2id, RBAC

## Architecture
- **Phase 1:** Normalized Prisma Schema
- **Phase 2:** Secure Auth System
- **Phase 3:** Core CRUD & Rate Limiting
- **Phase 4:** Local AI Embedding Ranking
- **Phase 5:** Real-time Collaboration
- **Phase 6:** Modern App Router UI

## Getting Started

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Start infrastructure:
   ```bash
   docker-compose up -d postgres redis
   ```
4. Run migrations:
   ```bash
   cd backend && npx prisma migrate dev
   ```
5. Start services:
   ```bash
   # Backend
   npm run start:dev
   # Frontend
   npm run dev
   ```

## License
MIT
