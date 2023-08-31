FROM node:18-alpine

WORKDIR /usr/src/free-to-play-games

COPY package*.json ./

RUN npm ci --production
COPY . .
EXPOSE 3001

CMD ["npm", "start"]
