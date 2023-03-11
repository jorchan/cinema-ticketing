FROM node:alpine as base

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "./src/server.js"] 