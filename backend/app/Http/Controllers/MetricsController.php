<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

define("DEFAULT_GOAL", "weight");

class MetricsController extends Controller
{
    /**
     * API to get display metrics for Graphs
     *
     * @param $request  Request data
     */
    public function get(Request $request)
    {
        $params = $request->all();

        $params['by'] =  $params['by'] ?? 'month';
        $params['goal'] =  $params['goal'] ?? DEFAULT_GOAL;

        $MIN_YEAR = ($params['by'] == 'month') ?
            $_ENV['MONTHLY_MIN_YEAR'] : $_ENV['YEARLY_MIN_YEAR'];

        $params['start'] = $params['start'] ?? $MIN_YEAR . "-01-01";
        $params['end'] = $params['end'] ?? date('Y-m-d');

        if ($params['by'] == 'month') {
            $points = DB::select(
                '
                SELECT AVG(count) AS average, MONTH(DATE) AS month
                FROM  cpc_logs
                WHERE goal LIKE ?
                AND year(date) BETWEEN ? AND ?
                GROUP by MONTH(date)
                ORDER by MONTH(date) ',
                [$params['goal'], $params['start'], $params['end']]
            );
        } else {
            $points = DB::select(
                '
                SELECT YEAR(date) AS year, AVG(count) AS average
                FROM `cpc_logs`
                WHERE goal = ?
                AND year(date) BETWEEN ? AND ?
                GROUP by YEAR(date)
                ORDER by YEAR(date) ',
                [$params['goal'], $params['start'], $params['end']]
            );
        }

        $returnObj = new \stdClass();
        $returnObj->params = $params;
        $returnObj->data = $points;

        return json_encode($returnObj);
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
        $goal = DEFAULT_GOAL;
        $month = $params['month'] ??  date('m');
        $day = $params['day'] ??  date('d');

        $entries = DB::select(
            '
            SELECT *
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
        $timestamp = strtotime("-1 year", time());
        $ytdStart = date('Y-m-d', $timestamp);
        $ytdEnd = date_create()->format('Y-m-d');

        $ytdLogs = DB::select(
            '
            SELECT YEAR(date) AS year, AVG(count) AS average
            FROM `cpc_logs`
            WHERE goal = ?
            AND date BETWEEN ? AND ?
            GROUP BY YEAR(date) ',
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
            "<a href=\"" . $_ENV['APP_URL'] . "\">Log Entry</a>" .
            "<h2>" . $ytdLogs[0]->year . " past Year, Average: " .
            number_format($yearAvg->average, 2) . "</h2>" .
            "<ul>" .
            $printedNonWeight .
            "</ul></BODY></HTML>";

        $subject = "On this day " . date('M d');
        $to =  $_ENV['REPORT_TO'];

        $headers = "From: tracks@" . $_ENV['ORIGIN'] . "\r\n";
        $headers .= "Reply-To: " . $_ENV['REPORT_TO'] . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        echo $to;
        echo $subject;
        echo $message;

        mail($to, $subject, $message, $headers);
        return "mail is sent";
    }

    /**
     * API to get years
     *
     * @param $request  Request data
     */
    public function years(Request $request)
    {
        $params = $request->all();
        $params['goal'] =  $params['goal'] ?? DEFAULT_GOAL;

        $points = DB::select(
            '
            SELECT YEAR(DATE) AS year
            FROM  cpc_logs
            WHERE goal LIKE ?
            GROUP BY YEAR(date)
            ORDER BY YEAR(date) DESC',
            [$params['goal']]
        );

        $returnObj = new \stdClass();
        $returnObj->params = $params;
        $returnObj->data = array_map(
            fn ($point) => $point->year,
            $points
        );

        return json_encode($returnObj);
    }


}
