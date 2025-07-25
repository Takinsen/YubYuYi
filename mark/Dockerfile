# ========== Base Builder Stage ==========
FROM node:20-alpine AS builder

# Install dependencies for native packages
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production deps (you can use full if needed for build)
RUN npm ci

# Copy all source files
COPY . .

# Build Next.js app
RUN npm run build

# ========== Final Runtime Stage ==========
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Only copy production files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the default port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
