<?php
/**
 * DAOFactory.php
 *
 * PHP Version 7.0
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
R::freeze(true);
R::ext(
    'xdispense',
    function ($type) {
        return R::getRedBean()->dispense($type);
    }
);
/**
 * DAOFactory
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
class DAOFactory
{
        /**
         * GetLogsDAO
         *
         * @return LogsRedbeanDAO
         */
    public static function getLogsDAO()
    {
        return new LogsRedbeanDAO();
    }
        /**
         * GetTracksDAO
         *
         * @return TracksRedbeanDAO
         */
    public static function getTracksDAO()
    {
        return new TracksRedbeanDAO();
    }
    public static function getPlansDAO()
    {
        return new PlansRedbeanDAO();
    }
    public static function getPlandatesDAO()
    {
        return new PlanDatesRedBeanDAO();
    }

    public static function getDatesDAO()
    {
        return new DatesRedBeanDAO();
    }

    public static function getResourceDAO()
    {
        return new CalResource();
    }

    public static function getEmailDAO()
    {
        return new EmailDAO();
    }
}
