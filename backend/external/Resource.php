<?php
/**
 * Resource.php
 *
 * PHP Version 5.4
 *
 * @date     2007-11-28
 * @category Personal
 * @package  default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
/**
 * Resource
 *
 * get contents from an external
 *
 * @date               2007-11-28
 * @category           Personal
 * @package            default
 * @author             Raymond Lim <rayjlim1@gmail.com>
 * @license            lilplaytime http://www.lilplaytime.com
 * @link               www.lilplaytime.com
 * @codeCoverageIgnore
 */
class Resource implements IResourceDAO
{

    /**
     * Content from URL
     *
     * @param string $url site url
     *
     * @return site content
     */
    public function setSession($key, $value)
    {
        if (session_id() == '') {
            session_start();// session isn't started
        }
        $_SESSION[$key] = $value;
    }

    /**
     * appendToFile
     *
     * @param string $file location for the file
     *
     * @return mixed value
     */
    public function getSession($key)
    {
        if (session_id() == '') {
            session_start();// session isn't started
        }
        return $_SESSION[$key];
    }

    public function issetSession($key)
    {
        if (session_id() == '') {
            session_start();// session isn't started
        }
        return isset($_SESSION[$key]);
    }
    public function setCookie($key, $value, $expiration)
    {
        setcookie($key, $value, $expiration);
    }
    public function destroySession()
    {
        session_destroy();
    }


    public function writeFile($filename, $content)
    {
        $filehandler = fopen($filename, 'a') or die("can't open file");
        fwrite($filehandler, $content);
        fclose($filehandler);
    }

    public function readdir($logDirectory)
    {
        $filelist = array();
        if ($handle = opendir($logDirectory)) {
            while (false !== ($file = readdir($handle))) {
                if ($file != "." && $file != ".." && $file != ".svn") {
                    array_push($filelist, $file);
                }
            }
            closedir($handle);
        }

        asort($filelist);
        $filelist2 = array();
        foreach ($filelist as $key => $val) {
            array_push($filelist2, $val);
        }
        return $filelist;
    }
    
    public function readfile($logfile)
    {
        $myFile = $logfile;
        $fh = fopen($myFile, 'r');
        $fileContents = fread($fh, filesize($myFile));

        fclose($fh);
        return $fileContents;
    }

    public function removefile($logfile)
    {
        $myFile = $logfile;
        unlink($myFile);
    }

    public function getDateTime()
    {
        return new DateTime();
    }

    public function load($url)
    {
        //echo 'url loadings: '.$url;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        //curl_setopt($curl, CURLOPT_HTTPHEADER, array("Accept: application/json"));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
    
    public function sendEmail($email, $subject, $message)
    {
        mail($email, $subject, $message);
    }

    public function shortCodes()
    {
        return array(
            '#a'=>'#awake',
        '#b'=>'#Bloodpressure',
        '#f'=>'#fitness',
        '#hr'=>'#Morning-hr',
        //'#m'=>'#mtnb',
        '#n'=>'#inthenews',
        '#p'=>'#pics',
        '#r'=>'#repeated-names',
        '#s'=>'#sleep',
        '#x'=>'#xexy',
        '#w'=>'#weight',

        '@b'=>'@baths',
        '@c'=>'@chores',
        '@p'=>'@pushups',
        '@s'=>'@snacks',
        '@u'=>'@pullups',

        '+w'=>'work on',
        );
    }
}
