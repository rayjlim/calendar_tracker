<?php

R::setup('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
R::freeze(true);
R::ext('xdispense', function ($type) {
    return R::getRedBean()->dispense($type);
});

class DAOFactory
{
    public static function getLogsDAO()
    {
        return new LogsRedbeanDAO();
    }
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
        return new CalResource ();
    }

    public static function getEmailDAO()
    {
        return new EmailDAO ();
    }

}
