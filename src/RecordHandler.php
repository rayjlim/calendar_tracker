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
        $data = $request->getParsedBody();
        $logEntry = $this->_ORM->insert(
            $data['goalId'],
            $data['date'],
            $data['count'],
            $data['comment']
        );

        $response->getBody()->write(json_encode(['success' => true, 'record' => $logEntry]));
        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
    /**
     * Update the Record
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $logEntry = $this->_ORM->update(
            $data['goalId'],
            $data['date'],
            $data['count'],
            $data['comment'],
            $args['id']
        );

        $response->getBody()->write(json_encode(['success' => true, 'record' => $logEntry]));
        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
    /**
     * Get a Record
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function get(Request $request, Response $response, $args)
    {
        $message = "Get it!" . $args['id'];
        $logEntry = json_decode('{"id":101}');
        // $logEntry = $this->_ORM->get(
        //     $args['id'],
        //     '2020-08-01',
        //     2,
        //     'comment about weight'
        // );
        $response->getBody()->write($message . 'new id ' . $logEntry->id);
        return $response;
    }
    /**
     * List Records
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function list(Request $request, Response $response, $args)
    {
        $message = "List it!";
        $logEntry = json_decode('{"id":101}');
        // $logEntry = $this->_ORM->get(
        //     $args['id'],
        //     '2020-08-01',
        //     2,
        //     'comment about weight'
        // );
        $response->getBody()->write($message . 'new id ' . $logEntry->id);
        return $response;
    }
}
