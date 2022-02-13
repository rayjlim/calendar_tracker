<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MetricsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
    public function get(Request $request)
    {
        $params = $request->all();

        $params['by'] =  (array_key_exists('by', $params)) ?
            $params['by'] : 'month';
        $params['goal'] =  (array_key_exists('goal', $params)) ?
            $params['goal'] : 'weight';

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
            $points = DB::select('
            select AVG( count ) AS average, month(DATE) as month


            FROM  cpc_logs
            WHERE goal like ?
                 AND year(date) BETWEEN ? AND ?
            GROUP by month(date)
            ORDER by month(date) ',
                [$params['goal'], $params['start'], $params['end']]
            );


        } else {
            $points = DB::select('
            SELECT year(date) as year, avg(count) as average
            FROM `cpc_logs`
            WHERE goal = ?
            AND year(date) between ? AND ?
            GROUP by YEAR(date)
            ORDER by YEAR(date) ',
                [$params['goal'], $params['start'], $params['end']]
            );
        }

        $returnObj = new \stdClass();
        $returnObj->data = $points;
        $returnObj->params = $params;

        header('Content-Type', 'application/json');
        echo json_encode($returnObj);
    }
}
