<?php
use \Lpt\DevHelp;

define("MIN_YEAR", "2010");

class LogHandler extends AbstractController
{
    public $dao = null;
    public function __construct($app, $_dao)
    {
        $this->dao = $_dao;
        parent::__construct($app);
    }

    public function listem()
    {
        return function () {
            $app = $this->app;
            DevHelp::debugMsg('start listLogs ' . __FILE__);

            $tracksDao = DAOFactory::getTracksDAO();
            $tracks = $tracksDao->getActive();

            $viewModel = array(
                'tracks' => $tracks);
            $app->render('logs.twig', $viewModel);
        };
    }

    public function save()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start save ' . __FILE__);
            $goal = $request->params('goal');
            $points = $request->params('points');
            $count = $request->params('count');
            $comment = $request->params('comment');
            $date = $request->params('date');
            $date = isset($date) && $date !== '' ? $date : date_create();
             
            $id = $request->params('id');
            DevHelp::debugMsg('update ' . $id);
            if (isset($id)) {
                DevHelp::debugMsg('yes ');
                $this->dao->update($id, $goal, $points, $count, $comment, $date);
            } else {
                $this->dao->insert($goal, $points, $count, $comment, $date);
            }
            $func = $this->listem();
            $func();
        };
    }

    public function remove()
    {
        return function ($id) {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start remove ' . __FILE__);
            $this->dao->delete($id);
            return $this->app->response->redirect('../../logs/');
        };
    }

    public function trigger()
    {
        return function ($id) {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start remove ' . __FILE__);
            $this->dao->toggleDisable($id);
            return $this->app->response->redirect('../../logs/');
        };
    }

    public function graphView()
    {
        return function () {
            $app = $this->app;
            DevHelp::debugMsg('start graphView ' . __FILE__);
            $viewModel = array();
            $app->render('logsGraph.twig', $viewModel);
        };
    }

    public function graphItems()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start graphItems ' . __FILE__);
            // todo: get params from request vars
            $params = new stdClass();
           
            $params->goal = $request->params('goal');
            $startParam = $request->params('start');
            $params->start = isset($startParam)
                ? date("Y-m-d", strtotime($startParam))
                : date("Y-m-d", strtotime("-2 months"));
            $endParam = $request->params('end');
            $params->end = isset($endParam)
                ? date("Y-m-d", strtotime($endParam))
                : date_create()->format('Y-m-d');

            $logs = $this->dao->get($params);

            $viewModel = array('params' => $params, 'logs' => $logs);
            echo json_encode($viewModel);
        };
    }

    public function reportView()
    {
        return function () {
            $app = $this->app;
            DevHelp::debugMsg('start reportView ' . __FILE__);
            $viewModel = array();
            $app->render('report.twig', $viewModel);
        };
    }

    public function report()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start reportMonth ' . __FILE__);
            // todo: get params from request vars
            $params = new stdClass();
           
            $params->goal = 'weight';
            $startParam = $request->params('start');
            $params->start = isset($startParam)
                ? date("Y", strtotime($startParam))
                : MIN_YEAR;
            $endParam = $request->params('end');
            $params->end = isset($endParam)
                ? date("Y", strtotime($endParam))
                : date_create()->format('Y-m-d');

            $logs = $this->dao->getMonthTrend($params);

            $viewModel = array('params' => $params, 'logs' => $logs);
            echo json_encode($viewModel);
        };
    }

    public function reportYear()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start reportYear ' . __FILE__);
            // todo: get params from request vars
            $params = new stdClass();
           
            $params->goal = 'weight';
            $startParam = $request->params('start');
            $params->start = isset($startParam)
                ? date("Y", strtotime($startParam))
                : MIN_YEAR;
            $endParam = $request->params('end');
            $params->end = isset($endParam)
                ? date("Y", strtotime($endParam))
                : date_create()->format('Y-m-d');

            $logs = $this->dao->getYearTrend($params);

            $viewModel = array('params' => $params, 'logs' => $logs);
            echo json_encode($viewModel);
        };
    }
}
