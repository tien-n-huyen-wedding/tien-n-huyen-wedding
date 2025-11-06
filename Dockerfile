# Single-stage build for Next.js static export
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the static site
RUN npm run build && ls -la /app/out || (echo "Build failed or out directory not created" && exit 1)

# Expose port 3000 (default for serve)
EXPOSE 3000

# Start the static file server
CMD ["npm", "run", "start"]
