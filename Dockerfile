FROM node:current-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add graphicsmagick

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 3000
CMD [ "node", "/app/build/index.js" ]
