#!/bin/sh
caddy run --config /etc/caddy/Caddyfile &

cd /app
node /app/build/index.js &

wait -n
exit $?
