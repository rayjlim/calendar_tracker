# Calendar Tracker

A personal project for tracking goals with inspiration from the Strides app

## Setup

### Backend

Requires `composer`  
Run `composer install`  
Create the DB using `config\base.sql`  
Use `config/SERVER_CONFIG.php.example` as template and edit accordingly.  
Place it at `backend/SERVER_CONFIG.php` .  

That sets up the API.

### Frontend

Go in to the `ui-react-native-web` folder

`npm run start`

## Footnote

See [Additional Docs](docs/index.md)

[github](https://github.com/rayjlim/calendar_tracker)  


## Deployment Error

`Parse error: syntax error, unexpected '?', expecting variable (T_VARIABLE) in /home4/lilplayt/public_html/tracks/vendor/slim/slim/Slim/Factory/AppFactory.php on line 84`
> caused by bluehost setting old version of php; fix by applying proper version to domain.
