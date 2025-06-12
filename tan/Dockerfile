# Install production dependencies
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev

# Create minimal runtime image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy only necessary app files
COPY . .

EXPOSE 8000

CMD ["node", "server.js"]
