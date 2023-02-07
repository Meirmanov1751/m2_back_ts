FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . /app

#RUN npm run build

CMD npm start
