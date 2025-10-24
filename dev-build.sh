#!/bin/bash

# 🔧 Development Build Script
# For testing and development

echo "🔧 Development Build"
echo "==================="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build
echo "🔨 Building..."
npm run build

# Start development server
echo "🚀 Starting development server..."
npm run dev
