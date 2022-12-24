FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

FROM nginx 
EXPOSE 3000

COPY ./nginx/default.config /etc/nginx/conf.d/default.config