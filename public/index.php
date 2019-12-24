<?php
require __DIR__ . '/../vendor/autoload.php';
// Create and configure Slim app
$config = ['settings' => [
    'addContentLengthHeader' => false,
    'displayErrorDetails' => true
]];

$app = new \Slim\App($config);

$app->get('/', function (\Slim\Http\Request $request, \Slim\Http\Response $response) {
    $response->getBody()->write("It works! This is the default welcome page.");
    return $response;
})->setName('root');

// Define app routes
$app->get('/hello/{name}', function (\Slim\Http\Request $request, \Slim\Http\Response $response, $args) {
    return $response->write("Hello " . $args['name']);
});

// Run app
$app->run();

