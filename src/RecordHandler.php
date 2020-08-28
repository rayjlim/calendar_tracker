<?php

namespace Tracker;

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
        $this->_ORM = ($ORM != null)
            ? $ORM // for DI in testing
            : new LogsRedbeanDAO();
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

        $logEntry = $this->_ORM->insert(
            $args['id'],
            '2020-08-01',
            2,
            'comment about weight'
        );
        $response->getBody()->write($message . 'new id ' . $logEntry->id);
        return $response;
    }
}
