# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cached until package files change)
COPY package.json package-lock.json ./
RUN npm install -g npm@11 && npm ci --ignore-scripts

# Copy source and build
COPY public/ ./public/
COPY src/ ./src/
RUN npm run build

# Stage 2: Serve
FROM nginx:1.27-alpine AS runtime

# Patch Alpine OS-level vulnerabilities
RUN apk update && apk upgrade --no-cache

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled output from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config (reverse proxy to backend services)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx listens on 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
