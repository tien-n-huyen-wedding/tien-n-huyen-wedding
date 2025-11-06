#!/bin/sh
set -e

# Get port from environment variable or default to 80
PORT=${PORT:-80}

# Export PORT for envsubst
export PORT

# Replace PORT in nginx template (nginx:alpine auto-processes templates, but we do it manually for control)
envsubst '$$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Test nginx configuration
nginx -t

# Start nginx
exec "$@"

