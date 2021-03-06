<?php
error_reporting(E_ALL);
date_default_timezone_set('America/Los_Angeles');
ini_set('display_errors', 1);

require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

\R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
\R::freeze(true);

$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->post(PREFIX   . 'record/', 'Tracker\RecordHandler:store')->setName('record-post');
$app->put(PREFIX    . 'record/{id}', 'Tracker\RecordHandler:update')->setName('record-put');
$app->delete(PREFIX . 'record/{id}', 'Tracker\RecordHandler:delete')->setName('record-delete');
$app->get(PREFIX    . 'record/{id}', 'Tracker\RecordHandler:get')->setName('record-get-one');
$app->get(PREFIX    . 'record/', 'Tracker\RecordHandler:list')->setName('record-list');

$app->get(PREFIX    . 'aggregate/', 'Tracker\RecordHandler:aggregate')->setName('aggregate');

$app->get(PREFIX    . 'cron/', 'Tracker\RecordHandler:cron')->setName('cron');


$app->get(PREFIX, function (Request $request, Response $response, $args) {
    $response->getBody()->write("lilplaytime/Tracks");
    return $response;
})->setName('root');

$app->run();
