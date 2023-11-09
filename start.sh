#!/bin/sh
caddy run --config /etc/caddy/Caddyfile &

cd /app
node build/index.js &

wait -n
exit $?
