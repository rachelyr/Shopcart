FROM node:18-alpine

ENV PORT=5000

WORKDIR /app

COPY Server/package*.json ./

RUN npm install --production

COPY Server/. .

EXPOSE 5000

CMD ["node", "server.js"]
