<?php
define('LOGS', 'cpc_logs');

class LogsRedbeanDAO
{
    public function queryAllOrderBy($orderColumn)
    {
        $logs = R::findAll(LOGS, ' order by ?', [$orderColumn]);
        $sequencedArray = array_values(array_map("getExportValues", $logs));
        return $sequencedArray;
    }

    public function get($params)
    {
        $logs = R::findAll(LOGS, ' goal like ? AND date between ? and ? order by date', [$params->goal, $params->start, $params->end]);
        $sequencedArray = array_values(array_map("getExportValues", $logs));
        return $sequencedArray;
    }

    public function load($id)
    {
        $log = R::load(LOGS, $id);
        return $log->export();
    }

    public function insert($goal, $points, $count, $comment, $date)
    {
        $log = R::xdispense(LOGS);
        $log->goal = $goal;
        $log->points = $points;
        $log->count = $count;
        $log->comment = $comment;
        $log->date = $date;
        $id = R::store($log);
        $log->id = $id;
        return $log;
    }

    public function update($id, $goal, $points, $count, $comment, $date)
    {
        $log  = R::findOne(LOGS, ' id = ?', [$id]);

        // echo ' rb: '. $value;
        $log->goal = $goal;
        $log->points = $points;
        $log->count = $count;
        $log->comment = $comment;
        $log->date = $date;
        R::store($log);
        return $log;
    }

    public function delete($id)
    {
        $xBean = R::load(LOGS, $id);
        R::trash($xBean);
        return;
    }

    public function toggleDisable($id)
    {
        $log = R::load(LOGS, $id);
        $log->is_disabled = !$log->is_disabled;
        R::store($log);
        return;
    }
    public function getMonthTrend($params)
    {
        $logs = R::getAll(
            '
        SELECT AVG( count ) AS average, month(DATE) as month
        FROM  cpc_logs 
        WHERE goal like ?
             AND year(date) BETWEEN ? AND ? 
        GROUP by month(date) 
        ORDER by month(date) ',
            [$params->goal, $params->start, $params->end]
        );

        return $logs;
    }
    public function getYearTrend($params)
    {
        $logs = R::getAll(
            '
        SELECT year(date) as year, avg(count) as average 
        FROM `cpc_logs` 
        WHERE goal = ? 
        AND year(date) between ? AND ? 
        GROUP by YEAR(date) 
        ORDER by YEAR(date) ',
            [$params->goal, $params->start, $params->end]
        );

        return $logs;
    }

    public function getSameDayEntries($month, $day)
    {
        $sql = ' 
        SELECT * 
        FROM `cpc_logs`
        WHERE goal = ?  
        AND  MONTH(date) = ' . $month . ' 
        AND Day(date) = ' . $day . '
        ORDER by YEAR(date) desc';
        $logs = R::getAll($sql, ["weight"]);
        return $logs;
    }

    // function getWeightAYearAgo($userId, $date) {
    //     $targetYear =  ($date->format('Y') - 1);
    //     $whereClause = ' where user_id = ? and date = \'' . $targetYear. $date->format('-m-d')
    //         . '\' and content  like "%#weight%"';
    //     $posts = R::findAll(POSTS, $whereClause . ' ', [$userId]);
    //     $sequencedArray = array_values(array_map("getExportValues", $posts));
    //     return (count($sequencedArray)) ? substr($sequencedArray[0]['content'],0,5) : 'none';
    // }
    
    // function getWeightAYearAgoAverage($userId, $date) {
    //     $targetYear =  ($date->format('Y') - 1);
    //     $whereClause = ' where user_id = ? and date <= \'' . $targetYear. $date->format('-m-d')
    //         . '\' and content  like "%#weight%"'
    //         . ' order by date desc limit 10';
    //     $posts = R::findAll(POSTS, $whereClause . ' ', [$userId]);
    //     $sequencedArray = array_values(array_map("getExportValues", $posts));

    //     return $sequencedArray;
    // }
}
