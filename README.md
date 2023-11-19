[![PHP Composer](https://github.com/rayjlim/calendar_tracker/actions/workflows/php.yml/badge.svg)](https://github.com/rayjlim/calendar_tracker/actions/workflows/php.yml) 
[![Node.js CI](https://github.com/rayjlim/calendar_tracker/actions/workflows/node.js.yml/badge.svg)](https://github.com/rayjlim/calendar_tracker/actions/workflows/node.js.yml)
# Calendar Tracker

A personal project for tracking goals with inspiration from the Strides app

For the frontend, it uses React Native Web and Chart.js

## Setup

### Backend

Go to `backend` folder
Requires `composer`
Run `composer install`  
Create the DB using `config\base.sql`  
Use `.env.example` as template for `.env` and `.env.production`; edit accordingly.  

That sets up the API.

> in linux, requires `apt install php8.2 php8.2-cli php8.2-common php8.2-xml php8.2-mbstring`

### Frontend

Go in to the `frontend` folder

`npm run start`

## Footnote

See [Additional Docs](docs/index.md)

[github](https://github.com/rayjlim/calendar_tracker)  

## Deployment Error

`Parse error: syntax error, unexpected '?', expecting variable (T_VARIABLE) in /home4/lilplayt/public_html/tracks/vendor/slim/slim/Slim/Factory/AppFactory.php on line 84`
> caused by bluehost setting old version of php; fix by applying proper version to domain.

## backend note

// ,"lint": "vendor/bin/phpcs --standard=cs-ruleset.xml src",
// "lint:second-ver": "vendor/bin/phpcs --config-set default_standard PSR2",
// "analyze": "vendor/bin/phpstan analyse --level 8 src tests",
// "test": "vendor/bin/codecept run unit",
// "test:watch": "vendor/bin/phpunit-watcher watch",
