# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/docs/package.json ./apps/docs/

# Install dependencies (this will download @plusui/library@0.1.23 from npm)
RUN pnpm install --frozen-lockfile

# Copy docs source
COPY apps/docs ./apps/docs

# Build documentation
RUN pnpm --filter apps-docs build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app

# Copy built docs
COPY --from=builder /app/apps/docs/dist ./dist

# Copy node_modules for font files (fontsource fonts are referenced from node_modules)
COPY --from=builder /app/node_modules ./node_modules

# Install serve globally
RUN npm install -g serve

ENV HOST=0.0.0.0
ENV PORT=4000
EXPOSE 4000

# Serve static files
CMD ["serve", "-s", ".", "-l", "4000"]
