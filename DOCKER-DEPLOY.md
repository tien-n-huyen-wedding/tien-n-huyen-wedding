# Docker Deployment Guide for Sevalla

This guide explains how to deploy the wedding website using Docker to Sevalla.

## Prerequisites

- Docker installed locally (for testing)
- Sevalla account with Docker support
- Git repository with the code

## Dockerfile Overview

The Dockerfile uses a multi-stage build:
1. **Builder stage**: Installs dependencies and builds the static site
2. **Production stage**: Uses nginx to serve the static files

## Local Testing

### Build the Docker image:

```bash
docker build -t wedding-website .
```

### Run the container:

```bash
docker run -p 3000:80 wedding-website
```

Visit `http://localhost:3000` to see your site.

### Using Docker Compose:

```bash
docker-compose up --build
```

## Deploying to Sevalla

### Option 1: Using Dockerfile (Recommended)

1. **Ensure Dockerfile is in your repository**:
   ```bash
   git add Dockerfile nginx.conf .dockerignore
   git commit -m "Add Docker configuration"
   git push origin main
   ```

2. **Configure Sevalla**:
   - Go to your Sevalla application settings
   - Set **Deployment Type**: `Docker`
   - Set **Dockerfile Path**: `Dockerfile` (or leave default)
   - Set **Port**: `80` (nginx default)

3. **Deploy**:
   - Sevalla will automatically detect the Dockerfile
   - It will build the image and deploy it
   - Your site will be available at the provided URL

### Option 2: Using Docker Compose

If Sevalla supports docker-compose:

1. Ensure `docker-compose.yml` is in your repository
2. Configure Sevalla to use docker-compose
3. Deploy as usual

## Docker Image Details

- **Base Image**: `node:20-alpine` (builder) + `nginx:alpine` (production)
- **Port**: 80 (nginx)
- **Size**: ~50-100MB (optimized with alpine)
- **Health Check**: Available at `/health`

## Configuration Files

- **Dockerfile**: Multi-stage build configuration
- **nginx.conf**: Nginx server configuration
- **.dockerignore**: Files to exclude from Docker build
- **docker-compose.yml**: Local development/testing

## Customization

### Change Port

Edit `nginx.conf` and `Dockerfile`:
```dockerfile
EXPOSE 8080  # In Dockerfile
```

```nginx
listen 8080;  # In nginx.conf
```

### Add Environment Variables

In `Dockerfile`:
```dockerfile
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://api.example.com
```

### Custom Nginx Configuration

Modify `nginx.conf` to add:
- Custom headers
- Redirects
- Rate limiting
- SSL configuration (if using reverse proxy)

## Troubleshooting

### Build Fails

1. Check Docker logs:
   ```bash
   docker build -t wedding-website . --no-cache
   ```

2. Verify Node version matches (20.x)

3. Check `.dockerignore` isn't excluding needed files

### Container Won't Start

1. Check nginx configuration:
   ```bash
   docker run -it wedding-website nginx -t
   ```

2. View logs:
   ```bash
   docker logs <container-id>
   ```

### Assets Not Loading

1. Verify files are in `out/` directory after build
2. Check nginx `root` path in `nginx.conf`
3. Ensure `try_files` directive is correct

### 404 Errors

1. Check `nginx.conf` has proper `try_files` directive
2. Verify `trailingSlash: true` in `next.config.ts`
3. Ensure all routes are exported in build

## Production Optimization

The Dockerfile is already optimized with:
- ✅ Multi-stage build (smaller image)
- ✅ Alpine Linux (minimal base)
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Security headers

## Health Checks

The container includes a health check endpoint at `/health`. Sevalla can use this to monitor container health.

## Alternative: Node.js Static Server

If you prefer Node.js over nginx, you can modify the Dockerfile:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/out ./out
EXPOSE 3000
CMD ["serve", "-s", "out", "-l", "3000"]
```

## Support

For Sevalla-specific Docker deployment issues:
- Check [Sevalla Docker Documentation](https://docs.sevalla.com/)
- Review build logs in Sevalla dashboard
- Contact Sevalla support

