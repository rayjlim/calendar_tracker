<?php

namespace Tracker;

define('LOGS', 'cpc_logs');
/**
 * LogsRedbeanDAO
 *
 * Logs implementation with Redbean 
 *
 * @category Personal
 * @package  Tracker
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
class LogsRedbeanDAO implements ILogsDAO
{
    /**
     * Insert a Record
     * 
     * @param $goalId  Goal Id
     * @param $date    Date
     * @param $count   Number
     * @param $comment String
     *
     * @return LogEntry
     */
    public function insert($goalId, $date, $count, $comment)
    {
        $log = \R::getRedBean()->dispense(LOGS);
        $log->goal = $goalId;
        $log->points = 0;
        $log->count = $count;
        $log->comment = $comment;
        $log->date = $date;
        $id = \R::store($log);
        $log->id = $id;
        return $log;
    }
    /**
     * Update a Record
     * 
     * @param $goal    Goal Id
     * @param $date    Date
     * @param $count   Number
     * @param $comment String
     * @param $id      Record Id
     *
     * @return LogEntry
     */
    public function update($goal, $date, $count, $comment, $id)
    {
        $log = \R::load(LOGS, $id);
        // echo ' rb: '. $value;
        $log->goal = $goal;
        $log->points = 0;
        $log->count = $count;
        $log->comment = $comment;
        $log->date = $date;
        \R::store($log);
        return $log;
    }
    /**
     * Delete a Record
     * 
     * @param $id Record Id
     *
     * @return LogEntry
     */
    public function delete($id)
    {
        $log = \R::load(LOGS, $id);
        \R::trash($log);
    }
    /**
     * Get a Record by Id
     * 
     * @param $id Record Id
     *
     * @return LogEntry
     */
    public function getById($id)
    {
        $log = \R::load(LOGS, $id);
        return $log;
    }

    /**
     * Get a Record by Date Range
     * 
     * @param $params array holding parameters
     *                ['goal'] String goal name
     *                ['start'] String start date range
     *                ['end'] String end of date range
     *
     * @return Array Log entries
     */
    public function getByDateRange($params)
    {
        $logs = \R::findAll(
            LOGS,
            ' goal like ? AND date between ? and ? order by date',
            [$params['goal'], $params['start'], $params['end']]
        );
        $sequencedArray = array_values(
            array_map(
                function ($item) {
                    return $item->export();
                },
                $logs
            )
        );
        return $sequencedArray;
    }

    /**
     * Get Metrics for Monthly Average
     * 
     * @param $params array holding parameters
     *                ['goal'] String goal name
     *                ['start'] String start date range
     *                ['end'] String end of date range
     *
     * @return Array Month / Average by Month
     */
    public function getMonthTrend($params)
    {
        $logs = \R::getAll(
            '
        SELECT AVG( count ) AS average, month(DATE) as month
        FROM  cpc_logs 
        WHERE goal like ?
             AND year(date) BETWEEN ? AND ? 
        GROUP by month(date) 
        ORDER by month(date) ',
            [$params['goal'], $params['start'], $params['end']]
        );

        return $logs;
    }

    /**
     * Get Metrics for Yearly Average
     * 
     * @param $params array holding parameters
     *                ['goal'] String goal name
     *                ['start'] String start date range
     *                ['end'] String end of date range
     *
     * @return Array Year / Average by each Year
     */
    public function getYearTrend($params)
    {
        $logs = \R::getAll(
            '
        SELECT year(date) as year, avg(count) as average 
        FROM `cpc_logs` 
        WHERE goal = ? 
        AND year(date) between ? AND ? 
        GROUP by YEAR(date) 
        ORDER by YEAR(date) ',
            [$params['goal'], $params['start'], $params['end']]
        );

        return $logs;
    }
    /**
     * Get Metrics for Same Day each year
     * 
     * @param $month number month of the year
     * @param $day   number day of the month
     *
     * @return Array Year / Average by each Year
     */
    public function getSameDayEntries($month, $day)
    {
        $sql = ' 
        SELECT * 
        FROM `cpc_logs`
        WHERE goal = ?  
        AND  MONTH(date) = ? 
        AND Day(date) = ?
        ORDER by YEAR(date) desc';
        $logs = \R::getAll($sql, ["weight", $month, $day]);
        return $logs;
    }

    // public function queryAllOrderBy($orderColumn)
    // {
    //     $logs = \R::findAll(LOGS, ' order by ?', [$orderColumn]);
    //     $sequencedArray = array_values(array_map(function ($item) {
    //         return $item->export();
    //     }, $logs));
    //     return $sequencedArray;
    // }

    // public function toggleDisable($id)
    // {
    //     $log = \R::load(LOGS, $id);
    //     $log->is_disabled = !$log->is_disabled;
    //     R::store($log);
    //     return;
    // }

    // function getWeightAYearAgo($userId, $date) {
    //     $targetYear =  ($date->format('Y') - 1);
    //     $whereClause = ' where user_id = ? and date = \'' 
    // . $targetYear. $date->format('-m-d')
    //         . '\' and content  like "%#weight%"';
    //     $posts = \R::findAll(POSTS, $whereClause . ' ', [$userId]);
    //     $sequencedArray = array_values(array_map(function ($array_item){
    // return $item->export();
    // }, $posts));
    //     return (count($sequencedArray)) 
    // ? substr($sequencedArray[0]['content'],0,5) 
    // : 'none';
    // }

    // function getWeightAYearAgoAverage($userId, $date) {
    //     $targetYear =  ($date->format('Y') - 1);
    //     $whereClause = ' where user_id = ? and date <= \'' . $targetYear 
    // . $date->format('-m-d')
    //         . '\' and content  like "%#weight%"'
    //         . ' order by date desc limit 10';
    //     $posts = \R::findAll(POSTS, $whereClause . ' ', [$userId]);
    //     $sequencedArray = array_values(array_map(function ($array_item){
    // return $item->export();
    // }, $posts));

    //     return $sequencedArray;
    // }
}
