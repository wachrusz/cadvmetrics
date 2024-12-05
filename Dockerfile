FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY ok_server.crt ok_server.key ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]