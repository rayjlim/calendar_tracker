<?php
require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);
$PREFIX = '/projects/tracks/';
// $PREFIX = '/tracks/public';

// $app->get($PREFIX.'store/', \tracker\RecordHandler::class.':store');
$app->get($PREFIX . 'store/{id}', 'tracker\RecordHandler:store');


$app->get($PREFIX, function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->run();
