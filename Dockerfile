# ─── Stage 1: Development ────────────────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# ─── Stage 2: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

RUN mkdir -p /app/dist-final/lights-out && \
    cp -r /app/dist/. /app/dist-final/lights-out/ && \
    cp /app/dist/index.html /app/dist-final/index.html

# ─── Stage 3: Production ─────────────────────────────────────────────────────
FROM nginx:alpine AS prod

COPY --from=builder /app/dist-final /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
