#!/bin/sh
set -e

# Get port from environment variable or default to 80
PORT=${PORT:-80}

# Export PORT for envsubst
export PORT

# Replace PORT in nginx template using envsubst
# Use single $ for variable substitution
envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Test nginx configuration
nginx -t

# Start nginx
exec "$@"

