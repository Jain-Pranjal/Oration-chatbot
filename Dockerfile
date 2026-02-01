# Use Node.js 20 Alpine as base image for smaller size
FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
# Either it will have this or docker will make it
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build



# Production stage
FROM node:20-alpine AS production

# Install pnpm globally in production stage
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev deps for build)
RUN pnpm install

# Copy built application from base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/src ./src
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/tsconfig.json ./

# Expose port 3000
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["pnpm", "start"]