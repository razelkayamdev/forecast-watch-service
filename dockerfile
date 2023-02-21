FROM node:18.12.0-alpine as builder

COPY . .
RUN npm ci
RUN npm run build

FROM node:18.12.0-alpine
# Adding `curl` to enable health check
RUN apk add curl
WORKDIR /app

COPY --from=builder dist dist
COPY --from=builder node_modules node_modules

ARG COMMIT_HASH
ENV COMMIT_HASH=${COMMIT_HASH}

CMD ["node", "dist/src/index.js"]