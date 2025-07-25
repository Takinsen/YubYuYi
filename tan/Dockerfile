# Multi-stage build for optimized Node.js backend
FROM node:20-alpine AS base

# Install security updates and dumb-init
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create app directory and non-root user
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# ================================
# Dependencies stage
# ================================
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install dependencies with npm ci for faster, reliable builds
RUN npm ci --only=production && npm cache clean --force

# ================================
# Production stage
# ================================
FROM base AS runner

# Copy node_modules from deps stage
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application code
COPY --chown=nodejs:nodejs . .

# Create logs directory
RUN mkdir -p logs && chown nodejs:nodejs logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the server
CMD ["node", "server.js"]