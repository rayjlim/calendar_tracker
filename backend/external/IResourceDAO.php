<?php
/**
* IResourceDAO.class.php
*
* PHP Version 5.4
*
* @date     2007-11-28
* @category Personal
* @package  Lpt
* @author   Raymond Lim <rayjlim1@gmail.com>
* @license  lilplaytime http://www.lilplaytime.com
* @link     www.lilplaytime.com
* 
*/
/**
* Intreface IResourceDAO
*
* @date     2007-11-28
* @category Personal
* @package  Lpt
* @author   Raymond Lim <rayjlim1@gmail.com>
* @license  lilplaytime http://www.lilplaytime.com
* @link     www.lilplaytime.com
*/  
interface IResourceDAO
{
    public function setSession($key, $value);
    public function getSession($key);
    public function issetSession($key);
    public function destroySession();
    public function setCookie($key, $value, $expiration);
    public function writeFile($filename, $fileData);
    public function readdir($logDirectory);
    public function readfile($logfile);
    public function removefile($logfile);
    public function getDateTime();
    /**
     * Content from URL
     *
     * @param string $url site url
     *
     * @return site content 
     */
    public function load($url);
    public function sendEmail($email, $subject, $message);
    public function shortCodes();
}
