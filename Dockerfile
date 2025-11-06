# Multi-stage build for Next.js static export
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the static site
RUN npm run build

# Production stage - serve static files
FROM nginx:alpine

# Install envsubst for template processing
RUN apk add --no-cache gettext

# Copy built static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy entrypoint script to handle dynamic port
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port (will be set by environment variable or default to 80)
EXPOSE 80

# Use entrypoint script to handle dynamic port
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

