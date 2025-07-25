# Multi-stage build for optimized Next.js frontend
FROM node:20-alpine AS base

# Install security updates and dumb-init
RUN apk update && apk upgrade && apk add --no-cache libc6-compat dumb-init

# Create app directory and non-root user
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# ================================
# Dependencies stage
# ================================

FROM base AS deps

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# ================================
# Builder stage
# ================================
FROM base AS builder

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN npm run build

# ================================
# Production stage
# ================================
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start Next.js server
CMD ["npm", "run", "start"]
