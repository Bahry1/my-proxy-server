#!/bin/bash
set -e

PORT_VALUE=${PORT:-10000}
UUID_VALUE=${UUID:-00000000-0000-0000-0000-000000000000}
HOST_VALUE=${HOST:-your-subdomain.onrender.com}

jq --arg port "$PORT_VALUE" --arg uuid "$UUID_VALUE" --arg host "$HOST_VALUE" '
  .inbounds[0].port = ($port | tonumber) |
  .inbounds[0].settings.clients[0].id = $uuid |
  .inbounds[0].streamSettings.wsSettings.headers.Host = $host
' /app/config.template.json > /app/config.json

echo "Using PORT=$PORT_VALUE UUID=$UUID_VALUE HOST=$HOST_VALUE"
exec /usr/local/bin/xray -config /app/config.json
