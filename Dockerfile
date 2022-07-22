FROM node:18.5-alpine3.15
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "node", "/app/build/index.js" ]