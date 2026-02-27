#!/bin/bash

OUTPUT="release.zip"

echo "Creating release archive from current commit (HEAD)..."

# Remove old archive
rm -f "$OUTPUT"

git archive --format=zip \
  --output="$OUTPUT" \
  HEAD \
  -- . \
  ':(exclude)tests' \
  ':(exclude)release.sh' \
  ':(exclude).git' \
  ':(exclude).github' \
  ':(exclude)node_modules'

if [ $? -eq 0 ]; then
  echo "✅ Release created successfully: $OUTPUT"
else
  echo "❌ Failed to create release"
  exit 1
fi