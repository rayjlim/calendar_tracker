<?php

namespace Tracker;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use stdClass;

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
        // echo "RecordHandler construct<br>";
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

        $response->getBody()->write(
            json_encode(
                [
                    'success' => true,
                    'record' => $logEntry
                ]
            )
        );
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

        $response->getBody()->write(
            json_encode(
                [
                    'success' => true,
                    'record' => $logEntry
                ]
            )
        );
        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
    /**
     * Delete the Record
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function delete(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $logEntry = $this->_ORM->delete($args['id']);

        $response->getBody()->write(
            json_encode(['success' => true])
        );
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
        $logEntry = $this->_ORM->getById($args['id']);
        $response->getBody()->write(
            json_encode(
                $logEntry
            )
        );
        $response->withHeader('Content-Type', 'application/json');
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
        $params = $request->getQueryParams();
        $params['goal'] =  (array_key_exists('goal', $params)) ?
            $params['goal'] : 'weight';
        $params['start'] =  (array_key_exists('start', $params)) ?
            $params['start'] : date("Y-m-d", strtotime("-2 months"));
        $params['end'] =  (array_key_exists('end', $params)) ?
            $params['end'] : date('Y-m-d');
        $logEntry = $this->_ORM->getByDateRange($params);
        $returnObj = new stdClass();
        $returnObj->data = $logEntry;
        $returnObj->params = $params;
        $response->getBody()->write(
            json_encode(
                $returnObj
            )
        );
        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Aggregate Metrics
     * 
     * @param $request  Request data
     * @param $response Response data
     * @param $args     Array
     *
     * @return Response
     */
    public function aggregate(Request $request, Response $response, $args)
    {
        $params = $request->getQueryParams();
        $params['by'] =  (array_key_exists('by', $params)) ?
            $params['by'] : 'month';

        $params['goal'] = 'weight';

        if ($params['by'] == 'month') {
            $MIN_YEAR = MONTHLY_MIN_YEAR;
        } else {
            $MIN_YEAR = YEARLY_MIN_YEAR;
        }
        $params['start'] = (array_key_exists('start', $params))
            ? $params['start']
            : $MIN_YEAR . "-01-01";
        $params['end'] = (array_key_exists('end', $params))
            ? $params['end']
            : date('Y-m-d');

        if ($params['by'] == 'month') {
            $points = $this->_ORM->getMonthTrend($params);
        } else {
            $points = $this->_ORM->getYearTrend($params);
        }

        $returnObj = new stdClass();
        $returnObj->data = $points;
        $returnObj->params = $params;
        $response->getBody()->write(
            json_encode(
                $returnObj
            )
        );
        $response->withHeader('Content-Type', 'application/json');
        return $response;
    }
}
