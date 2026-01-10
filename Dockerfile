# Vektar Production Dockerfile
# Uses npm instead of pnpm

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with npm (--legacy-peer-deps for date-fns/react-day-picker conflict)
RUN npm ci --legacy-peer-deps

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

# Expose port (Railway uses dynamic $PORT)
EXPOSE ${PORT:-3000}

# Start the server using Railway's PORT or default to 3000
CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
