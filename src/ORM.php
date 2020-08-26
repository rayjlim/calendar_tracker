<?php

namespace tracker;

/**
 * ORM
 * 
 * @category None
 * @package  Tracker
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link     http://github.com/rayjlim/calendar_tracker
 */
class ORM
{
    public $hasOrm = false;
    /**
     * __construct
     */
    public function __construct()
    {
        echo "construct ORM<br>";
    }
    /**
     * Save the Record
     * 
     * @param $date  data
     * @param $value data
     * @param $goal  Array
     *
     * @return status
     */
    public function save($date, $value, $goal)
    {

        return 'saved';
    }
}
