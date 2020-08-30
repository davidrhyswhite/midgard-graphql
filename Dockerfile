# Building container

FROM node:14.9.0 as builder

WORKDIR /build

COPY . .

RUN yarn install && \
  yarn lint && \
  yarn test && \
  yarn build && \
  rm -rf node_modules/ && \
  yarn install --production

# Running container

FROM node:14.9.0-alpine

WORKDIR /app

COPY --from=builder /build ./

EXPOSE 8082

CMD [ "yarn", "start" ]