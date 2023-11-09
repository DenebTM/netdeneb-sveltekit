#!/bin/sh
cd /
caddy run --config /Caddyfile &
node /app/build/index.js
