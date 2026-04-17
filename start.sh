#!/bin/bash

# Navigate to the web app directory
cd chairman-web

# Install dependencies if node_modules don't exist
if [ ! -d "node_modules" ]; then
  npm install
fi

# Build and start the app
npm run build
npm run preview -- --host 0.0.0.0 --port ${PORT:-3000}
