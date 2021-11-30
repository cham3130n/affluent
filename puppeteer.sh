#!/bin/bash
cd puppeteer
yarn
yarn build:local
cd ..
docker-compose run puppeteer sh -c "yarn --production"
docker-compose up --build puppeteer