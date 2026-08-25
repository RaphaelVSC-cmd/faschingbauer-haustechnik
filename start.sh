#!/usr/bin/env bash
python3 -m http.server 3000 &
sleep 1
if which xdg-open > /dev/null; then
  xdg-open http://localhost:3000
elif which open > /dev/null; then
  open http://localhost:3000
fi
wait
