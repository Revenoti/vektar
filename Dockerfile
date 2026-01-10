# Vektar Production Dockerfile
# Uses npm instead of pnpm

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with npm
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Expose port (Railway will override with $PORT)
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]
