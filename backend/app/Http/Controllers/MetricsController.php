<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MetricsController extends Controller
{
    /**
     * API to get display metrics
     *
     * @param $request  Request data
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

            // $points = [];
            $points = DB::select(
                '
                select AVG( count ) AS average, month(DATE) as month
                FROM  cpc_logs
                WHERE goal like ?
                AND year(date) BETWEEN ? AND ?
                GROUP by month(date)
                ORDER by month(date) ',
                [$params['goal'], $params['start'], $params['end']]
            );
        } else {
            $points = DB::select(
                '
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
        $returnObj->params = $params;
        $returnObj->data = $points;


        echo json_encode($returnObj);
    }

    /**
     * Email Report
     *
     * @param $request  Request data
     *
     */
    public function emailReport(Request $request)
    {
        $params = $request->all();
        $goal = 'weight';
        $month =  (array_key_exists('month', $params)) ?
            $params['month'] :  date('m');

        $day =  (array_key_exists('day', $params)) ?
            $params['day'] :  date('d');

        $entries = DB::select(
            '
                SELECT *
                FROM `cpc_logs`
                WHERE goal = ?
                AND  MONTH(date) = ?
                AND Day(date) = ?
                ORDER by YEAR(date) desc',
            [
                "weight",
                $month,
                $day
            ]
        );

        $ytdStart = date_create()->format('Y-01-01');
        $ytdEnd = date_create()->format('Y-m-d');

        $ytdLogs = DB::select(
            '
            SELECT year(date) as year, avg(count) as average
            FROM `cpc_logs`
            WHERE goal = ?
            AND date between ? AND ?
            GROUP by YEAR(date) ',
            [
                $goal,
                $ytdStart,
                $ytdEnd
            ]
        );

        $yearAvg = $ytdLogs[0];
        $printedNonWeight = array_reduce(
            $entries,
            function ($carry, $item) {
                $entryDay = new \DateTime($item->date);
                $message =  "<li>" . $entryDay->format('Y-D')
                    . ': ' . $item->count
                    . ': ' . $item->comment . "</li>";
                return $carry .= $message;
            }
        );

        $message = "<HTML><BODY>" .
            "<h1>Weight Trends</h1>" .
            "<a href=\"https://tracks.lilplaytime.com/\">Log Entry</a>" .
            "<h2>" . $ytdLogs[0]->year . " Year to date, Average: " .
            number_format($yearAvg->average, 2) . "</h2>" .
            "<ul>" .
            $printedNonWeight .
            "</ul></BODY></HTML>";

        $subject = "On this day " . date('M d');
        $to =  $_ENV['REPORT_TO'];

        $headers = "From: tracks@lilplaytime.com\r\n";
        $headers .= "Reply-To: " . $_ENV['REPORT_TO'] . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        echo $to;
        echo $subject;
        echo $message;

        mail($to, $subject, $message, $headers);
        echo "mail is sent";
    }
}
