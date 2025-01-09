<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $records = array_map(function ($record) {
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

    /**
     * API to get Same Day entries
     *
     * @param $request  Request data
     */
    public function onThisDay(Request $request)
    {
        $params = $request->all();
        $month =  $params['month'] ?? date('m');
        $day =  $params['day'] ?? date('d');

        $entries = DB::select(
            '
            SELECT date, count, comment
            FROM `cpc_logs`
            WHERE goal = ?
            AND  MONTH(date) = ?
            AND DAY(date) = ?
            ORDER BY YEAR(date) DESC',
            [
                "weight",
                $month,
                $day
            ]
        );
        return json_encode($entries);
    }
    /**
     * API to get the dates for a specific year
     *
     * @param $request  Request data
     */
    public function yearLogs(Request $request)
    {
        $params = $request->all();
        $year =  $params['year'] ?? date('Y');

        $entries = DB::select(
            '
            SELECT date
            FROM `cpc_logs`
            WHERE goal = ?
            AND  YEAR(date) = ?
            ORDER BY date ASC',
            [
                "weight",
                $year
            ]
        );
        return json_encode($entries);
    }
}
