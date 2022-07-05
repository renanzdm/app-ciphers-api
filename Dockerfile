FROM  node:alpine

LABEL version="0.0.1" description="node image"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "start"]