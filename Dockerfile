FROM node:current-alpine as build-image
ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY static ./static
COPY *.js *.ts tsconfig.json ./
RUN npx svelte-kit sync
RUN npm run build

FROM alpine:edge
ENV NODE_ENV=production
COPY --from=build-image /app/build /app/build

RUN apk update
RUN apk add nodejs caddy graphicsmagick

RUN mkdir /caddy
WORKDIR /caddy
RUN ln -s /files .
RUN ln -s /art .
RUN ln -s /img .
RUN ln -s /thumbs .
COPY Caddyfile /etc/caddy/

COPY start.sh /
RUN chmod +x /start.sh

EXPOSE 80
CMD [ "/start.sh" ]
