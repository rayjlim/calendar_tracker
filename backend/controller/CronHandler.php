
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
      $resource = DAOFactory::getResourceDAO();
    $targetDay = $resource->getDateTime();
    
    $entries = $this->dao->getSameDayEntries($targetDay);

    $printedNonWeight = array_reduce($entries, "printEntrys");
      echo(sizeof($entries));
    $message = "<HTML><BODY><ul>" . $printedNonWeight . "</ul></BODY></HTML>";

    $subject = "On this day ". $targetDay->format('M d'); 
    $to = 'rayjlim1@gmail.com';
    
      $headers = "From: smsblog@lilplaytime.com\r\n";
      $headers .= "Reply-To: rayjlim1@gmail.com". "\r\n";
      $headers .= "X-Mailer: PHP/" . phpversion();
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    //mail($to, $subject, $message, $headers);
    echo $message;
    };
  }

}
function printEntrys($carry, $item){
  $entryDay = new DateTime($item['date']);
  $message =  "<li>". $entryDay->format('Y-D') . ': ' . $item['content'] . "</li>";
  return $carry.=$message;
}