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
$router->options('/record/', function () use ($router) {
    return $router->app->version();
});

// $app->post( '/record/', 'Tracker\RecordHandler:store')->setName('record-post');
// $app->put( '/record/{id}', 'Tracker\RecordHandler:update')->setName('record-put');
// $app->delete(PREFIX . '/record/{id}', 'Tracker\RecordHandler:delete')->setName('record-delete');
// $app->get( '/record/{id}', 'Tracker\RecordHandler:get')->setName('record-get-one');


// $app->get( '/aggregate/', 'Tracker\RecordHandler:aggregate')->setName('aggregate');

// $app->get( '/cron/', 'Tracker\RecordHandler:cron')->setName('cron');
