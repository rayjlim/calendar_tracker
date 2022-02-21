<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/record/', 'RecordController@list');
$router->post('/record/', 'RecordController@add');
$router->delete('/record/{id}', 'RecordController@remove');

$router->options('/record[/{id}]', function () use ($router) {
    return $router->app->version();
});

$router->get('/aggregate/', 'MetricsController@get');

$router->options('/aggregate/', function () use ($router) {
    return $router->app->version();
});

$router->get('/cron/', 'MetricsController@emailReport');


// $app->put( '/record/{id}', 'Tracker\RecordHandler:update')->setName('record-put');
// $app->get( '/record/{id}', 'Tracker\RecordHandler:get')->setName('record-get-one');
