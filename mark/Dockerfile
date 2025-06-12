# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all frontend files
COPY . .

# Build Next.js for production
RUN npm run build

# Stage 2: Run the built app
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose Next.js default port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
