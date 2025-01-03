#!/bin/sh
set -e

_term() {
  sig="$1"
  if [ -z "$sig" ]; then
    sig='TERM'
  fi
  kill -"$sig" $pid1 $pid2

  exit_status=$((128 + $(kill -l $sig)))
  echo "$exit_status"
  if [ "$exit_status" == 143 ]; then
    exit_status=0
  fi

  exit $exit_status
}

caddy run --config /etc/caddy/Caddyfile &
pid1=$!

cd /app
node /app/build/index.js &
pid2=$!

trap '_term INT' INT
trap '_term TERM' TERM

wait -n
exit $?
