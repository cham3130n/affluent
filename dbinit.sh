#!/bin/sh
cd ./service
yarn install
./node_modules/.bin/sequelize-cli --config migrations/config.json --models-path migrations/models --migrations-path migrations db:migrate