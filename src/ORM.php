<?php

namespace tracker;

class ORM
{
    public $hasOrm = false;

    public function __construct($ORM = null)
    {
        echo "construct ORM<br>";
    }
    public function save($date, $value, $goal)
    {

        return 'saved';
    }
}
