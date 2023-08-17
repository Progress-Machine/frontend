FROM node:16

COPY package*.json ./

WORKDIR /usr/src/app

RUN npm install --production
RUN npm install sharp

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]