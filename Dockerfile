FROM node:current-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add caddy
# RUN apk add graphicsmagick

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY static ./static
COPY *.js *.ts tsconfig.json ./
RUN npx svelte-kit sync
RUN npm run build

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
