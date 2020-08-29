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

$app->post(PREFIX . 'record/', 'Tracker\RecordHandler:store');
$app->put(PREFIX . 'record/{id}', 'Tracker\RecordHandler:update');
// $app->get(PREFIX  . 'record/{id}', 'Tracker\RecordHandler:get');
// $app->get(PREFIX  . 'record/', 'Tracker\RecordHandler:list');

$app->get(PREFIX, function (Request $request, Response $response, $args) {
    $response->getBody()->write("lilplaytime/Tracks");
    return $response;
});

$app->run();
