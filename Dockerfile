# Dockerfile for Plus UI Documentation
# Optimized for Dokploy deployment

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy all workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/core/package.json ./packages/core/
COPY apps/docs/package.json ./apps/docs/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY packages/core ./packages/core
COPY apps/docs ./apps/docs

# Build core library first (required by docs)
RUN pnpm --filter @plusui/library build

# Build documentation
RUN pnpm --filter apps-docs build

# Stage 2: Production
FROM node:22-alpine AS runner
WORKDIR /app

# Copy built documentation
COPY --from=builder /app/apps/docs/dist ./dist

# Install a simple static server using npm
RUN npm install -g serve

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
