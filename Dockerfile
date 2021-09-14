FROM node:alpine 

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . /usr/app

EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]