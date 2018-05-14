# Modified from https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378
FROM node:8

LABEL maintainer="shaun.thium@gmail.com"

# From: https://github.com/GoogleChrome/puppeteer/issues/1345#issuecomment-343554457
# Install necessary apt packages for puppeteer bundled chromium work
RUN apt-get update && apt-get install --no-install-recommends -y \
  ca-certificates \
  curl \
  fontconfig \
  fonts-liberation \
  gconf-service \
  git \
  libappindicator1 \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  lib\x11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  locales \
  lsb-release \
  unzip \
  wget \
  xdg-utils \
  xsel

RUN npm install -g serve
EXPOSE 5000

COPY package*.json ./
RUN npm install
RUN npm i -g eslint

COPY . .

RUN npm run build --production

CMD serve -s build