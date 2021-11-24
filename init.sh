#!/bin/sh
cd ./service
./node_modules/.bin/sequelize-cli db:migrate \
  --config migrations/config.json \
  --models-path migrations/models \
  --migrations-path migrations