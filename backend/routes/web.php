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
$router->options('{any:.*}', function () {
    return response()->json(['status' => 'OK'], 200);
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/record/', 'RecordController@list');
$router->post('/record/', 'RecordController@add');
$router->delete('/record/{id}', 'RecordController@remove');
$router->get('/yearLogs/', 'RecordController@yearLogs');

$router->get('/onThisDay/', 'RecordController@onThisDay');

$router->get('/aggregate/', 'MetricsController@get');
$router->get('/cron/', 'MetricsController@emailReport');
$router->get('/years/', 'MetricsController@years');

// $app->put( '/record/{id}', 'Tracker\RecordHandler:update')->setName('record-put');
// $app->get( '/record/{id}', 'Tracker\RecordHandler:get')->setName('record-get-one');
