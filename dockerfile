FROM node:18.12.0-alpine as builder

COPY . .
RUN npm ci
RUN npm run build

FROM node:18.12.0-alpine
# Supporting a health check by adding curl.
RUN apk add curl
WORKDIR /app

COPY --from=builder dist dist
COPY --from=builder node_modules node_modules

CMD ["node", "dist/index.js"]