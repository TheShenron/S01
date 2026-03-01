#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./release.sh vX.X.X"
  exit 1
fi

VERSION=$1
PROJECT_NAME=$(basename "$(pwd)")
OUTPUT="${PROJECT_NAME}-${VERSION}.zip"

echo "Creating release archive for $PROJECT_NAME ($VERSION)..."

git archive --format=zip \
  --output="$OUTPUT" \
  "$VERSION" \
  -- . \
  ':(exclude)tests' \
  ':(exclude)release.sh' \
  ':(exclude).dockerignore' \
  ':(exclude).DS_Store' \
  ':(exclude)Dockerfile'

if [ $? -eq 0 ]; then
  echo "✅ Created $OUTPUT"
else
  echo "❌ Failed. Make sure the tag exists."
fi