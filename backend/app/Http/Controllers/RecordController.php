<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    /**
     * List records.
     *
     * @param  Request  $request
     * @return Response
     */
    public function list(Request $request)
    {
        $params = $request->all();

        $params['goal'] =  $params['goal'] ?? 'weight';
        $params['start'] =  $params['start'] ?? date("Y-m-d", strtotime("-2 months"));
        $params['end'] = $params['end'] ?? date('Y-m-d');

        $records = Record::where('goal', 'like', $params['goal'])
            ->where('date', '>=', $params['start'])
            ->where('date', '<=',  $params['end'])
            ->orderBy('date')
            ->get()
            ->toArray();

        // Floating point issue in PHP 7+
        $records = array_map(function ($record)
        {
          $record["count"] = round($record["count"], 1) . '';
          return $record;
        }, $records);

        return json_encode([
            'data' => $records,
            'params' => $params
        ]);
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

        return json_encode([
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

        return json_encode([
            'success' => true
        ]);
    }
}
