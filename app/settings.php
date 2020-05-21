<?php

$settings = [];

// Slim settings
$settings['displayErrorDetails'] = true;
$settings['determineRouteBeforeAppMiddleware'] = true;

// Path settings
$settings['root'] = dirname(__DIR__);
$settings['temp'] = $settings['root'] . '/tmp';
$settings['public'] = $settings['root'] . '/public';

// View settings
$settings['twig'] = [
    'path' => $settings['root'] . '/templates',
    'cache_enabled' => false,
    'cache_path' =>  $settings['temp'] . '/twig-cache'
];

// Database settings
$settings['db'] = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'username' => 'root',
    'database' => 'test',
    'password' => '',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'flags' => [
        PDO::ATTR_PERSISTENT => false,
        // Enable exceptions
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // Set default fetch mode
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ],
];

return $settings;