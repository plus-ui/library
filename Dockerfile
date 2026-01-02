# Multi-stage Dockerfile for Plus UI Documentation
# Optimized for Dokploy deployment

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/core/package.json ./packages/core/
COPY apps/docs/package.json ./apps/docs/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build core library
FROM node:22-alpine AS core-builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/core/node_modules ./packages/core/node_modules

# Copy core package source
COPY package.json pnpm-workspace.yaml ./
COPY packages/core ./packages/core

# Build core library
RUN pnpm --filter core build

# Stage 3: Build documentation
FROM node:22-alpine AS docs-builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules

# Copy built core library
COPY --from=core-builder /app/packages/core/dist ./packages/core/dist
COPY --from=core-builder /app/packages/core/package.json ./packages/core/package.json

# Copy docs source
COPY package.json pnpm-workspace.yaml ./
COPY apps/docs ./apps/docs

# Build documentation
RUN pnpm --filter apps-docs build

# Stage 4: Production
FROM node:22-alpine AS runner
WORKDIR /app

# Install pnpm (needed for running the app)
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy built documentation
COPY --from=docs-builder /app/apps/docs/dist ./dist

# Install a simple static server
RUN pnpm add -g serve

# Expose port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the server
CMD ["serve", "-s", "dist", "-l", "4000"]
