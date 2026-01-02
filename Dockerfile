# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/core/package.json ./packages/core/
COPY apps/docs/package.json ./apps/docs/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY packages/core ./packages/core
COPY apps/docs ./apps/docs

# Build core library first (required by docs)
RUN pnpm --filter @plusui/library build

# Build documentation
RUN pnpm --filter apps-docs build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app

# Copy built docs and required node_modules
COPY --from=builder /app/apps/docs/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Install serve globally
RUN npm install -g serve

ENV HOST=0.0.0.0
ENV PORT=4000
EXPOSE 4000

CMD ["serve", "-s", "dist", "-l", "4000"]
