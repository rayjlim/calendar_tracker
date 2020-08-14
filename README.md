# Calendar Tracker

A personal project for tracking weight and graphing

[github](https://github.com/rayjlim/calendar_tracker)  

## Dependencies

install composer globally

### php-curl

requires `sudo apt install -y php7.3-curl php7.3-mbstring php7.3-xml`

## Setup

copy `backend/SERVER_CONFIG.php.example` to `backend/SERVER_CONFIG.php` and edit accordingly.  

That's it

New feature: spiritual, mental, physical scale tracker

## Known fixes

sudo chown -R ray /home/ray/.composer/cache/repo/

## Development

`vendor/bin/phpcs --config-set default_standard PSR2`
