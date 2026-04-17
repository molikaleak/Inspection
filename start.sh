#!/bin/bash

# This script is used by Railpack/Railway to build and start the application.
# It runs from the root directory.

# Install dependencies for all workspaces
npm install

# Build the chairman-web project
npm run build -w chairman-web

# Start the preview server
# Railpack/Railway typically provides a PORT environment variable.
npm run preview -w chairman-web -- --host 0.0.0.0 --port ${PORT:-3000}
