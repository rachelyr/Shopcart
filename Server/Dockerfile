FROM node:18-alpine

ENV PORT=5000

WORKDIR /Server

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "Server.js"]
