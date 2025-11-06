# Sevalla Deployment Troubleshooting

## Error: "upstream connect error or disconnect/reset before headers"

This error typically indicates a port mismatch or the application not starting properly.

### Solution 1: Use Simple Dockerfile (Recommended)

If you're getting port connection errors, try using the simplified Dockerfile:

1. **Rename or use the simple Dockerfile**:
   ```bash
   # Option A: Replace current Dockerfile
   cp Dockerfile.simple Dockerfile

   # Option B: Configure Sevalla to use Dockerfile.simple
   # In Sevalla settings, set Dockerfile Path: Dockerfile.simple
   ```

2. **Ensure Sevalla port configuration**:
   - In Sevalla application settings
   - Set **Port**: `80`
   - Set **Deployment Type**: `Docker`

### Solution 2: Check Sevalla Port Requirements

Some platforms require specific ports. Try these:

1. **Check Sevalla documentation** for required port
2. **Common ports**:
   - `80` (HTTP)
   - `8080` (Alternative HTTP)
   - `3000` (Node.js default)

3. **Update Dockerfile** if needed:
   ```dockerfile
   EXPOSE 8080  # Change if Sevalla requires different port
   ```

4. **Update nginx.conf**:
   ```nginx
   listen 8080;  # Match the EXPOSE port
   ```

### Solution 3: Use Static Site Deployment Instead

If Docker continues to have issues, use static site deployment:

1. **In Sevalla settings**:
   - Set **Deployment Type**: `Static Site` (not Docker)
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `out`
   - **Node Version**: `20.x`

2. **Remove or ignore Dockerfile** for this deployment method

### Solution 4: Verify Build Output

Ensure the build is successful:

1. **Check build logs** in Sevalla dashboard
2. **Verify `out/` directory** contains:
   - `index.html`
   - `_next/` directory
   - All static assets

3. **Test locally**:
   ```bash
   npm run build
   ls -la out/  # Should see files
   ```

### Solution 5: Check Container Logs

If using Docker:

1. **View logs** in Sevalla dashboard
2. **Look for**:
   - Nginx startup messages
   - Port binding errors
   - File permission issues

### Solution 6: Environment Variables

Some platforms require environment variables:

1. **In Sevalla settings**, add:
   - `PORT=80` (if using dynamic port Dockerfile)
   - `NODE_ENV=production`

### Solution 7: Health Check Configuration

Ensure health checks are working:

1. **Health endpoint**: `/health`
2. **Should return**: `200 OK` with "healthy"
3. **Configure in Sevalla** if health check settings are available

## Quick Fix Checklist

- [ ] Verify Dockerfile is in repository root
- [ ] Check Sevalla port setting matches Dockerfile EXPOSE
- [ ] Ensure nginx.conf listens on correct port
- [ ] Verify build completes successfully
- [ ] Check container logs for errors
- [ ] Test health endpoint: `https://your-app.sevalla.app/health`
- [ ] Try static site deployment as alternative

## Alternative: Node.js Static Server

If nginx continues to have issues, use a Node.js static server:

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
ENV PORT=3000
CMD ["serve", "-s", "out", "-l", "tcp://0.0.0.0:${PORT}"]
```

Then set Sevalla port to `3000`.

## Still Having Issues?

1. **Check Sevalla Documentation**: [https://docs.sevalla.com/](https://docs.sevalla.com/)
2. **Contact Sevalla Support**: They can help with platform-specific issues
3. **Review Build Logs**: Look for specific error messages
4. **Try Static Deployment**: Often simpler and more reliable for static sites

