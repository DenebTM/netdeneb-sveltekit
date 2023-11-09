FROM node:current-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add caddy
# RUN apk add graphicsmagick

RUN mkdir /caddy
WORKDIR /caddy
COPY Caddyfile /etc/caddy/
RUN ln -s /files .
RUN ln -s /art .
RUN ln -s /img .
RUN ln -s /thumbs .

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src *.js *.ts tsconfig.json ./
RUN npm run build

COPY start.sh /
RUN chmod +x /start.sh

EXPOSE 80
CMD [ "/start.sh" ]
