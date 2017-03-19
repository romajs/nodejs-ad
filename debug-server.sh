#!/usr/bin/env bash

./node_modules/.bin/nodemon --debug ./src/server.js &

sleep 1

./node_modules/.bin/node-debug