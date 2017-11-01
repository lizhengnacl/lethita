#!/usr/bin/env bash

rm -rf lib
babel src --out-dir lib
babel src/index.js --out-file  lib/index.js
./node_modules/.bin/webpack --config webpack.build.config.js --progress
