FROM node:current-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add caddy
# RUN apk add graphicsmagick

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

WORKDIR /
RUN mv /app/Caddyfile /
RUN mv /app/start.sh /
RUN chmod +x /start.sh

EXPOSE 80
CMD [ "/start.sh" ]
