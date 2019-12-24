<?php
use \Lpt\DevHelp;

class TrackHandler extends AbstractController
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
            DevHelp::debugMsg('start listTracks ' . __FILE__);
            $tracks = $this->dao->queryAllOrderBy('name');

            $app->render('tracks.twig', array('tracks' => $tracks));
        };
    }
    public function save()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start saveTrack ' . __FILE__);
            $name = $request->params('name');
            $shortcode = $request->params('shortcode');
            $points = $request->params('points');
            $type = $request->params('type');
            $this->dao->insert($name, $shortcode, $points, $type);

            return $this->app->response->redirect('./');
        };
    }
    public function remove()
    {
        return function ($id) {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start removeTrack ' . __FILE__);
            $this->dao->delete($id);
            return $this->app->response->redirect('../../tracks/');
        };
    }
    public function disable()
    {
        return function ($id) {
            $app = $this->app;
            $request = $app->request();
            DevHelp::debugMsg('start removeTrack ' . __FILE__);
            $this->dao->toggleDisable($id);
            return $this->app->response->redirect('../../tracks/');
        };
    }
}
