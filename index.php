<?php namespace tracker;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
define('_PS_MODE_DEV_', true);
ini_set('MAX_EXECUTION_TIME', 3600);
session_start();

if (isset($_REQUEST['debug'])) {
    $_SESSION['debug'] = $_REQUEST['debug'] == 'on' ? true : false;
}
require 'vendor/autoload.php';

\R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
\R::freeze(true);
\R::ext(
    'xdispense',
    function ($type) {
        return \R::getRedBean()->dispense($type);
    }
);
date_default_timezone_set('America/Los_Angeles');
$getcwd = getcwd();
$DIR_SEP = (strpos($getcwd, "\\") != 0) ? "\\" : "/";
$app = new \Slim\Slim();

// TEMPLATING
// Prepare view
$app->view(new \Slim\Views\Twig());
$app->view->parserOptions = array(
    'charset' => 'utf-8',
    'cache' => realpath('../templates/cache'),
    'auto_reload' => true,
    'strict_variables' => false,
    'autoescape' => true
);
$app->view->parserExtensions = array(new \Slim\Views\TwigExtension());

$view = $app->view();
// END TEMPLATING

$view->appendData(array(
    'rooturl'=> ROOTURL,
    'baseurl'=> BASEURL,
    'rootHttp'=> ROOT_HTTP
    ));

$app->get('/', function () use ($app) {
    $app->redirect('plans/');
});

$planViewer = new PlanViewer($app, DAOFactory::getPlansDAO());
$planHandler = new PlanHandler($app, DAOFactory::getPlansDAO());
$trackHandler = new TrackHandler($app, DAOFactory::getTracksDAO());
$logHandler = new LogHandler($app, DAOFactory::getLogsDAO());
$cronHandler = new CronHandler($app, DAOFactory::getLogsDAO());

$app->get('/plans/', $planViewer->listItems());
$app->get('/plans/:id', $planViewer->itemDetails());
$app->post('/plans/', $planHandler->addEntry());
$app->post('/plans/saveTemplateDates', $planHandler->saveTemplateDates());
$app->post('/plans/publish', $planHandler->publish());

$app->get('/viewDates/', $planViewer->viewDates());   // calendar view
$app->post('/viewDates/', $planViewer->createDate());  // calendar view

$app->get('/api/plans/:id', $planViewer->itemDetails());
$app->get('/api/plans/', $planViewer->listItems());
$app->post('/api/plans/', $planHandler->addEntry());
$app->put('/api/plans/:id', $planHandler->updateEntry());
$app->get('/api/delete/dates/:id', $planHandler->deleteDatesPlan());

$app->get('/delete/plans/:id', $planHandler->deleteEntry());
$app->delete('/api/plans/:id', $planHandler->deleteEntry());

$app->get('/tracks/', $trackHandler->listem());
$app->post('/tracks/', $trackHandler->save());
$app->get('/delete/tracks/:id', $trackHandler->remove());
$app->get('/disable/tracks/:id', $trackHandler->disable());

$app->get('/logs/', $logHandler->listem());
$app->post('/logs/', $logHandler->save());
$app->get('/delete/logs/:id', $logHandler->remove());
$app->get('/trigger/logs/:id', $logHandler->trigger()); // change count by # based from track
$app->get('/graph/', $logHandler->graphView());

$app->get('/api/logs/', $logHandler->graphItems());

$app->get('/api/report/', $logHandler->report());
$app->get('/api/reportYear/', $logHandler->reportYear());
$app->get('/report/', $logHandler->reportView());

$app->get('/cron', $cronHandler->logCronCall());

$app->get('/api/testGoogleConnection/', function () {
    $resource = DAOFactory::getResourceDAO();
    $gClient = $resource->createGoogleCalendarConnection();
    // $helper = new CalendarHelper($resource);//$resource->getDateTime()
    $date = $resource->getDateTime();
    $resource->sendToGcal($gClient, 'test title3', 'test content', $date->format('Y-m-d'));
    echo 'test calendar entry created';
});

$app->run();
