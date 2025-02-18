FROM node:current-alpine as build-image
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:current-alpine as prod-modules
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:current-alpine
ENV NODE_ENV=production

COPY --from=build-image /app/build /app/build
COPY --from=prod-modules /app/node_modules /app/node_modules
WORKDIR /app

EXPOSE 3000
CMD [ "node", "build/index.js" ]
