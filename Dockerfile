# Single-stage build for Next.js static export
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment variable for base URL (for sevalla.app deployment)
ARG NEXT_PUBLIC_BASE_URL=https://tien-n-huyen-wedding.sevalla.app
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Generate sitemap and robots.txt with correct base URL
RUN node scripts/generate-sitemap-robots.js

# Build the static site
RUN npm run build && ls -la /app/out || (echo "Build failed or out directory not created" && exit 1)

# Expose port 80 (default for serve)
EXPOSE 80

# Start the static file server
CMD ["npm", "run", "start"]
