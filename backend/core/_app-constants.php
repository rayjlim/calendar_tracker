<?php
date_default_timezone_set('America/Los_Angeles');
$getcwd = getcwd();
// Windows or Unix separators
$DIR_SEP = (strpos($getcwd, "\\") != 0) ? "\\" : "/";
define("DIR_SEP", $DIR_SEP);
define("ABSPATH", $getcwd . $DIR_SEP);

define("APP_NAME", "cal_plan_creator");

define ("LOGS_DIR", dirname( ABSPATH ) . DIR_SEP .'_logs');
define ("LOG_PREFIX", APP_NAME);
