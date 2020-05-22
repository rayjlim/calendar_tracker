<?php namespace tracker;

/**
 * IEpcalResource
 *
 * System resource abstractor
 *
 * @category Personal
 * @package  default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
interface ICalResource
{
    public function sendToGcal($gClient, $title, $content, $date);
    public function createGoogleCalendarConnection();
}
