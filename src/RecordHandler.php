<?php

namespace tracker;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * RecordHandler
 * 
 * @category None
 * @package  Tracker
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link     http://github.com/rayjlim/calendar_tracker
 */
class RecordHandler
{
    public $hasOrm = false;
    private $_ORM = null;
    /**
     * __construct
     * 
     * @param $ORM Data Model
     */
    public function __construct($ORM = null)
    {
        echo "RecordHandler construct<br>";
        // parent::__construct($app);
        if ($ORM != null) {
            // "use Injected ORM<br>";
            $this->hasOrm = true;
            $this->_ORM = $ORM;
        } else {
            // use Factory ORM
            $this->_ORM = new \tracker\ORM();
        }
    }
    /**
     * Store the Record
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function store(Request $request, Response $response, $args)
    {
        $message = "Hello store it!" . $args['id'];
        $response->getBody()->write($message);
        $this->_ORM->save($args['id'], 2, 'weight');
        return $response;
    }
}
