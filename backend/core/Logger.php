<?php namespace Lpt;

/**
 * Logger
 *
 * Debugging helper
 *
 * @package Lpt
 */

class Logger
{
    public static function log($message)
    {
        if (! isset($_SESSION['logger'])) {
            $iResource = \DAOFactory::getResourceDAO();
            $date = $iResource->getDateTime();
            $filename = LOGS_DIR.DIR_SEP.LOG_PREFIX."-" . $date->format("Y-m").".txt";
            $fileData = $date->format("Y-m-d G:i:s") . "    " . $message."\n";
            $iResource->writeFile($filename, $fileData);
        }
    }
}
