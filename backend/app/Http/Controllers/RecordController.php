<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;

function test()
{
    return "aa";
}
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

        //     $fixedRecords = array_map(function ($item)
        //     {
        //         // $item->count = number_format($item->count, 2);
        //         return $item;
        //     }
        // , $records);


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
        $record = new Record;
        $record->goal = $request->goal;
        $record->date = $request->date;
        $record->count = $request->count;
        $record->comment = $request->comment;
        // $record->updated_at = date("Y/m/d");

        $record->save();

        echo json_encode([
            'success' => true,
            'record' => $record
        ]);
    }
    /**
     * Delete record.
     *
     * @param  Request  $request
     * @return Response
     */
    public function remove($id)
    {
        Record::findOrFail($id)->delete();

        echo json_encode([
            'success' => true
        ]);
    }
}
