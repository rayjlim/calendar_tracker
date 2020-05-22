<?php
/**
 * _app-constants.php
 *
 * PHP Version 7.0
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */

// Windows or Unix separators

define("DIR_SEP", $DIR_SEP);
define("ABSPATH", $getcwd . $DIR_SEP);

define("APP_NAME", "cal_plan_creator");

define("LOGS_DIR", dirname(ABSPATH) . DIR_SEP .'_logs');
define("LOG_PREFIX", APP_NAME);
