FROM node:current-alpine as build-image
ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY static ./static
COPY *.js *.ts tsconfig.json ./
RUN npm run build

FROM alpine:edge
ENV NODE_ENV=production

RUN apk update && apk add nodejs caddy graphicsmagick patch

RUN mkdir /caddy
WORKDIR /caddy
RUN ln -s /files . && \
    ln -s /art .   && \
    ln -s /img .   && \
    ln -s /thumbs .

COPY browse-thumbs.patch .
RUN caddy file-server export-template > /caddy/browse-thumbs.html && \
    patch browse-thumbs.html browse-thumbs.patch && \
    rm -f browse-thumbs.patch browse-thumbs.html.orig

COPY Caddyfile /etc/caddy/

COPY start.sh /
RUN chmod +x /start.sh

COPY --from=build-image /app/build /app/package.json /app/build
COPY --from=build-image /app/node_modules /app/node_modules

EXPOSE 80
CMD [ "/start.sh" ]
