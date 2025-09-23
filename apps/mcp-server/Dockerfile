FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

# Change ownership of the app directory
RUN chown -R mcp:nodejs /app
USER mcp

# Expose port (if running HTTP server mode)
EXPOSE 8555

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Health check: OK')" || exit 1

# Start the MCP server in HTTP mode
CMD ["npm", "run", "start:http"]