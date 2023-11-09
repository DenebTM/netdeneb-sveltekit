#!/bin/sh
cd /
caddy run --config /Caddyfile &

cd /app
node build/index.js &

wait -n
exit $?
