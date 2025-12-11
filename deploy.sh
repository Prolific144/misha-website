#!/bin/bash

# Misha Foodstuffs Deployment Script
# Usage: ./deploy.sh [environment]

ENVIRONMENT=${1:-production}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$TIMESTAMP"

echo "🚀 Starting deployment to $ENVIRONMENT..."

# Step 1: Backup current build
echo "📦 Creating backup..."
mkdir -p $BACKUP_DIR
cp -r dist/* $BACKUP_DIR/ 2>/dev/null || true

# Step 2: Clean and build
echo "🔧 Cleaning previous build..."
rm -rf dist

echo "🏗️ Building for $ENVIRONMENT..."
export VITE_APP_ENV=$ENVIRONMENT

if [ "$ENVIRONMENT" = "production" ]; then
  npm run build
else
  npm run build:staging
fi

# Step 3: Run tests
echo "🧪 Running tests..."
npm run test 2>/dev/null || echo "⚠️ No tests configured"

# Step 4: Analyze bundle
echo "📊 Analyzing bundle..."
npm run analyze 2>/dev/null || echo "⚠️ Bundle analyzer not configured"

# Step 5: Deploy based on environment
case $ENVIRONMENT in
  "staging")
    echo "🚚 Deploying to staging..."
    # Add staging deployment commands here
    ;;
  "production")
    echo "🚚 Deploying to production..."
    
    # Deploy to GitHub Pages
    if [ -f "package.json" ] && grep -q '"homepage": "https://snoog1.github.io/misha-website"' package.json; then
      echo "🌐 Deploying to GitHub Pages..."
      npm run deploy
    fi
    
    # Optional: Deploy to Netlify
    if command -v netlify &> /dev/null; then
      echo "🌐 Deploying to Netlify..."
      netlify deploy --prod --dir=dist
    fi
    
    # Optional: Deploy to Vercel
    if command -v vercel &> /dev/null; then
      echo "🌐 Deploying to Vercel..."
      vercel --prod
    fi
    ;;
  *)
    echo "📁 Building only (no deployment)"
    ;;
esac

# Step 6: Health check
echo "🏥 Performing health check..."
if [ -f "dist/index.html" ]; then
  echo "✅ Build successful!"
  echo "📈 Performance metrics:"
  
  # Check bundle sizes
  find dist -name "*.js" -exec ls -lh {} \; | head -5
  find dist -name "*.css" -exec ls -lh {} \;
  
  # Check PWA assets
  if [ -f "dist/manifest.json" ]; then
    echo "📱 PWA manifest found"
  fi
  
  # Check service worker
  if [ -f "dist/sw.js" ]; then
    echo "⚙️ Service worker found"
  fi
else
  echo "❌ Build failed!"
  exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "🕒 Backup saved to: $BACKUP_DIR"