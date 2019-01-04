
<?php
use \Lpt\DevHelp;

class CronHandler extends AbstractController
{
  var $plandatesDao = null;
  function __construct($app, $_logsDao) {
      $this->dao = $_logsDao;
      parent::__construct($app);
  }

  public function logCronCall() {
    return function () {
      $app = $this->app;
      $request = $app->request();
      $resource = DAOFactory::getResourceDAO();
    $today = $resource->getDateTime();
      $month = $request->params('month') !== null ? $request->params('month') : $today->format('n');
      $day = $request->params('day') !== null ? $request->params('day') : $today->format('d');

    $entries = $this->dao->getSameDayEntries($month, $day);

    $printedNonWeight = array_reduce($entries, "printEntrys");
    $message = "<HTML><BODY><h1>Weight Trends</h1><ul>" . $printedNonWeight . "</ul></BODY></HTML>";

    $subject = "On this day ". $today->format('M d'); 
    $to = REPORT_TO;
    
      $headers = "From: cal_tracker@lilplaytime.com\r\n";
      $headers .= "Reply-To: ". REPORT_TO . "\r\n";
      $headers .= "X-Mailer: PHP/" . phpversion();
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
      echo $message;

    mail($to, $subject, $message, $headers);
    echo "mail sent";
    };
  }

}
function printEntrys($carry, $item){
  $entryDay = new DateTime($item['date']);
  $message =  "<li>". $entryDay->format('Y-D') . ': ' . $item['count']. ': ' . $item['comment'] . "</li>";
  return $carry.=$message;
}