FROM node:20 AS build

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node","index.js"]