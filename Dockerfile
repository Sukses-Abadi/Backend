FROM node:lts-alpine3.17

COPY package*.json ./

WORKDIR /Docker-lessons/scr/app

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start-docker" ]