<?php

/**
 * DevHelp Class Doc Comment
 *
 * PHP Version 5.4
 *
 * @date     2007-11-28
 * @category Personal
 * @package  Lpt
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
namespace Lpt;

/**
 * DevHelp
 *
 * Debugging helper
 *
 * @date     2007-11-28
 * @category Personal
 * @package  Lpt
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
class DevHelp
{
    
    /**
     *  debugger_msg
     *
     * @param string $msg message output
     *
     * @return None
     */
    public static function debugMsg($msg)
    {
        if ((isset($_SESSION['debug']) && $_SESSION['debug']) && !isset($_REQUEST["xhr"])) {
            echo $msg . '<br>';
        }
    }
    public static function debugAndLogMsg($msg)
    {
        if ((isset($_SESSION['debug']) && $_SESSION['debug']) && !isset($_SESSION['xhr'])) {
            echo $msg . '<br>';
        }
        Logger::log($msg);
    }
    
    /**
     *  redirectHelper
     *
     * @param string $url target location
     *
     * @return None
     */
    public static function redirectHelper($url)
    {
        if (isset($_SESSION['debug']) && $_SESSION['debug']) {
            echo '<a href="' . $url . '">Follow Redirect ' . $url . '</a>';
        } else {
            header("Location: $url");
        }
        exit;
    }
}

if (isset($_REQUEST['debug'])) {
    $_SESSION['debug'] = $_REQUEST['debug'] == 'on' ? true : false;
}
