<?php
use \Lpt\DevHelp;

class CalResource extends Resource implements ICalResource
{
    public $shortenMonth = array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    public $expandedMonth   = array("January","February","March","April","May","June","July","August","September","October","November","December");

    public function sendToGcal($gClient, $title, $content, $date)
    {
        // $client = $_SESSION['gClient'];
        $service = new Google_Service_Calendar($gClient);

        $event = new Google_Service_Calendar_Event();
        $event->setSummary($title);
        $event->setLocation($content);

        $start = new Google_Service_Calendar_EventDateTime();
        $start->setDate($date);
        $event->setStart($start);
        $event->setEnd($start);
        $createdEvent = $service->events->insert(GCAL_ID, $event);

        return $createdEvent->getId();
    }

    public function createGoogleCalendarConnection()
    {
        // OAuth2 client ID and secret can be found in the Google Developers Console.
        $scriptUri = "http://".$_SERVER["HTTP_HOST"].$_SERVER['PHP_SELF'];
        $scriptUri .= isset($_SERVER['QUERY_STRING']) ? "?".$_SERVER['QUERY_STRING'] : '';
        $client = new Google_Client();
        $client->setAccessType('online'); // default: offline
        $client->setApplicationName('Calendar Plan Creator');
        $client->setClientId(GOOGLE_CLIENT_ID);
        $client->setClientSecret(GOOGLE_CLIENT_SECRET);
        $client->setRedirectUri($scriptUri);
        //$client->setDeveloperKey('AIzaSyAePyU1yKI5wGJVFFaE4mJu25S1HIXvZac'); // API key
        $client->addScope("https://www.googleapis.com/auth/calendar");

        // $service implements the client interface, has to be set before auth call

        if (isset($_GET['logout'])) { // logout: destroy token
            $logMessage = "gauth:logged out";
            DevHelp::debugAndLogMsg($logMessage);
            unset($_SESSION['token']);
            die('Logged out.');
        }
        if (isset($_SESSION['token'])) { // extract token from session and configure client
            $token = $_SESSION['token'];
            $client->setAccessToken($token);
        } elseif (isset($_GET['code'])) { // we received the positive auth callback, get the token and store it in session
            $client->authenticate($_GET['code']);
            $token = $client->getAccessToken();
            $_SESSION['token'] = $token;
        }

        if (!$client->getAccessToken()) { // auth call to google
            $logMessage = "gauth:getAccessToken";
            DevHelp::debugAndLogMsg($logMessage);
            $authUrl = $client->createAuthUrl();
            header("Location: ".$authUrl);
            die;
        }
        DevHelp::debugMsg('Resource::createGoogleCalendarConnection');

        return $client;
        // $_SESSION['gClient'] = $client;
    }
}// end class
