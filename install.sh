#!/bin/bash
docker-compose up -d postgres
cd service
yarn
sleep 5 # may need time to start mariadb
yarn migrate:local
docker-compose stop postgres