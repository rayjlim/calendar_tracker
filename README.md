# Calendar Tracker

A personal project for tracking goals with inspiration from the Strides app

For the frontend, it uses React Native Web and Chart.js

## Setup

### Backend

Go to `backend` folder
Requires `composer`
Run `composer install`  
Create the DB using `config\base.sql`  
Use `.env.example` as template and edit accordingly.  

That sets up the API.

### Frontend

Go in to the `frontend` folder

`npm run start`

## Footnote

See [Additional Docs](docs/index.md)

[github](https://github.com/rayjlim/calendar_tracker)  

## Deployment Error

`Parse error: syntax error, unexpected '?', expecting variable (T_VARIABLE) in /home4/lilplayt/public_html/tracks/vendor/slim/slim/Slim/Factory/AppFactory.php on line 84`
> caused by bluehost setting old version of php; fix by applying proper version to domain.
