## Description
Monorepository for code challenge contains three parts:
1. Postgres container to serve database. Though the database itself is placed outside of container in bound folder `./postgress` 
2. API client project written in TypeScript in folder `./service`
3. Puppeteer project written in TypeScript in folder `./puppeteer`

> *Project root contains docker-compose configuration and first run scripts.*
>
> *Project includes environment files `.env` despite the fact they should not exist in repostory.*

## Requirements

Running this repository assumes that client has installed next tools:
* Node 14 or higher
* Yarn as packet manager
* docker with docker-compose

> The project was developed and deployed in Linux (OS X) environment. Therefore the behavior on Windows platforms keeps undetermined.  

## Deployment

Project root folder contains scripts that should be run first to create all needed folders and dependencies
```
# create postgres container and run migrations on it.
./install.sh

# build API Client and install all of it's dependencies, runs application
./apiclient.sh

# build Puppeteer and install all of it's dependencies, runs application
./puppeteer.sh  
```

After all projects are built it is possible to run them without resolving dependencies
```
# Run built API Client
docker-compose up apiclient

# Run built Puppeteer
docker-compose up puppeteer
```
> *Postgres container is a dependency for both application containers, so there's no need to run it directly*

## Manual rebuild
One can easily rebuild each of applications. Only few steps to reach.
```
# Go to the project folder
$ cd puppeteer

# Build project
$ yarn build:local
OR
$ yarn do:clean # delete 'dist' folder and all it's content
$ yarn do:compile # build JS application in 'dist' folder
$ yarn do:dependencies # copy package.json and environment files

# Go to the repository root
$ cd ..

# Install dependencies
# They should be installed through the container run to fit container's configuration
docker-compose run puppeteer sh -c "yarn --production"

# Run application
docker-compose up puppeteer
```

## Information
> As there were maintenance works on the source web page for Puppeteer, it isn't finished.
Also there are no any configured relations in database, as well as separate indices for faster database search.
