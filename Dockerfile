FROM node:16-alpine as builder

COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./tsconfig.json
COPY src ./src/

RUN npm run build

# --- Second part
FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder dist/ dist/
COPY migrations ./migrations/

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]