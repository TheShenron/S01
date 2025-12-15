# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /test_runner

# Copy only what is needed
COPY . .

# Install dependencies (fast, cached)
# RUN npm install

# expose port for local dev server 
# EXPOSE 5173

# Run tests by default
CMD ["npm", "test"]