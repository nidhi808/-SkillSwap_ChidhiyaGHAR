# ==========================================
# Phase 1: Build & Dependencies
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# ==========================================
# Phase 2: Production Image
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/db.sql ./db.sql

EXPOSE 4000

USER node

CMD ["node", "src/server.js"]
