<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');

        //
    }
    /**
     * List records.
     *
     * @param  Request  $request
     * @return Response
     */
    public function list(Request $request)
    {
        $params = $request->all();

        $params['goal'] =  (array_key_exists('goal', $params)) ?
            $params['goal'] : 'weight';
        $params['start'] =  (array_key_exists('start', $params)) ?
            $params['start'] : date("Y-m-d", strtotime("-2 months"));
        $params['end'] =  (array_key_exists('end', $params)) ?
            $params['end'] : date('Y-m-d');

        $records = Record::where('goal', 'like', $params['goal'])
            ->where('date', '>=', $params['start'])
            ->where('date', '<=',  $params['end'])
            ->orderBy('date')
            ->get();

        $returnObj = new \stdClass();
        $returnObj->data = $records;
        $returnObj->params = $params;
        echo json_encode($returnObj);
    }

 /**
     * Add record.
     *
     * @param  Request  $request
     * @return Response
     */
    public function add(Request $request)
    {
        $params = $request->all();
        echo json_encode($params);
    // echo "post";
        // $params = $request->all();



        // $records = Record::where('goal', 'like', $params['goal'])
        //     ->where('date', '>=', $params['start'])
        //     ->where('date', '<=',  $params['end'])
        //     ->orderBy('date')
        //     ->get();

        // $returnObj = new \stdClass();
        // $returnObj->data = $records;
        // $returnObj->params = $params;
        // echo json_encode($returnObj);
    }

}
