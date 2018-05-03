# Modified from https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378
FROM node:8.9.3-slim

LABEL maintainer="shaun.thium@gmail.com"

RUN npm install -g serve
EXPOSE 5000

COPY package.json package.json
RUN npm install

COPY . .

RUN npm run build --production

CMD serve -s build