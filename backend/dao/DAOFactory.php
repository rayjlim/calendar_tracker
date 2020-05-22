<?php namespace tracker;

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
