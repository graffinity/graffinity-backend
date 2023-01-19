# Graffinity

[![Website status](https://img.shields.io/website?down_color=cb2432&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fgraffinity.art.html.svg)](https://graffinity.art)

[![backend continuous integration](https://github.com/graffinity/graffinity-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/graffinity/graffinity-backend/actions/workflows/ci.yml)
![GitHub branch checks state](https://img.shields.io/github/checks-status/graffinity/graffinity-backend/master)
  
[![Open Pull Requests](https://img.shields.io/github/issues-pr-raw/graffinity/graffinity-backend.svg)](https://github.com/graffinity/graffinity-backend/pulls)
[![GitHub issues](https://img.shields.io/github/issues/graffinity/graffinity-backend.svg)](https://github.com/graffinity/graffinity-backend/issues)
  <!-- <p align="center">
    <a href="http://nestjs.com/" target="blank">
      <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
    </a>
  </p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a> -->
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Graffinity is a social network for artists. It allows users to create and share their art with the world. Users can also follow other users and like their art. Users can also create and join groups to share their art with other users.

## Installation

```bash
npm install
```

## Create docker containers

  Create required docker containers for the application to run with the `docker-compose` command.
  
  ```bash
  docker-compose -f docker-compose-local.yml up -d
  ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger (API documentation)

```bash
# start the server
$ npm run start

# or
$ npm run start:dev
```

Go to [http://localhost:8080/api](http://localhost:8080/api) to access the Swagger UI.

<!-- ## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE). -->
