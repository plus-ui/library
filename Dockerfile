# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY apps/docs/package*.json ./
RUN npm install

# Copy source files (including scripts/ directory)
COPY . .

# Build (prebuild script will generate code-examples.json automatically)
RUN npm run build

# Stage 2: Production
FROM node:20-slim
WORKDIR /app

# Copy built application (includes dist/client/data/code-examples.json)
COPY --from=builder /app/apps/docs/dist ./dist
COPY --from=builder /app/apps/docs/node_modules ./node_modules
COPY --from=builder /app/apps/docs/package.json ./package.json

ENV HOST=0.0.0.0
ENV PORT=4000
EXPOSE 4000
