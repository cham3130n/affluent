#!/bin/bash
cd service
yarn
yarn build:local
cd ..
docker-compose run apiclient sh -c "yarn --production"
docker-compose up --build apiclient
