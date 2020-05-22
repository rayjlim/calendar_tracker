<?php namespace tracker;

/**
 * AbstractController
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
abstract class AbstractController
{
    public $app = null;
       /**
        * Constructor
        *
        * @param   $app
        *
        * @return none
        */
    public function __construct($app)
    {
        $this->app = $app;
    }
}
