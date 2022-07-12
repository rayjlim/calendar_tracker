<?php
// There is a bug where array_key_exists("HTTP_ORIGIN", $_SERVER)
// if (!array_key_exists("HTTP_ORIGIN", $_SERVER)) {
//     echo "key HTTP_ORIGIN does not exist";

//     print_r($_SERVER);
//     exit();
// } elseif (strpos($_SERVER['HTTP_ORIGIN'], $_ENV['ORIGIN']) !== false) {
//     header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
// } else {
//     echo "SERVER and ENV key HTTP_ORIGIN does not match";
//     // print_r($_SERVER);

//     echo "\nhttp origin ";
//     print_r($_SERVER['HTTP_ORIGIN']);

//     echo "\nenv origin ";
//     print_r($_ENV['HTTP_ORIGIN']);

//     exit();
// }

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-app-token");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD');
header('Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD');

define("MONTHLY_MIN_YEAR", 2012);
define("YEARLY_MIN_YEAR", 2010);

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| First we need to get an application instance. This creates an instance
| of the application / container and bootstraps the application so it
| is ready to receive HTTP / Console requests from the environment.
|
*/

$app = require __DIR__ . '/../bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$app->run();
