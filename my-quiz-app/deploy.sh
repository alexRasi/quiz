#!/bin/bash

# Navigate to your project directory
#cd /path/to/your/project

# Pull latest changes from Git
git pull

# Install dependencies
npm install

# Build your project
npm run build-ign

# Serve the application
serve -s dist -l 3000