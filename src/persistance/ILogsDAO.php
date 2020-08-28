<?php

namespace Tracker;

/**
 * ILogsDAO
 *
 * Interface for Logs 
 *
 * @category Personal
 * @package  Tracker
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
interface ILogsDAO
{
    /**
     * Insert the Record
     * 
     * @param $goalId  Goal Id
     * @param $date    Date
     * @param $count   Number
     * @param $comment String
     *
     * @return LogEntry
     */
    public function insert($goalId, $date, $count, $comment);
}
