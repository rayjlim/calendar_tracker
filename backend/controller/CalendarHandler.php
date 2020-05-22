<?php namespace tracker;

use \Lpt\DevHelp;

class CalendarHandler extends AbstractController
{
    public $plandatesDao = null;
    public function __construct($app, $_planDao)
    {
        $this->dao = $_planDao;
        parent::__construct($app);
    }

    // TODO: move this function to calendarhandler
    public function sendToCalendar()
    {
        return function () {
            DevHelp::debugMsg('start sendToCalendar ' . __FILE__);

            $app = $this->app;
            $resource = DAOFactory::getResourceDAO();
            $gClient = $resource->createGoogleCalendarConnection();

            $targetEndDate = $app->request()->params('endDate');
            $templateId = $app->request()->params('templateId');

            $plan = $this->dao->load($templateId);
            var_dump($plan);
            $planDatesDao = DAOFactory::getPlandatesDAO();
            $plandates = $planDatesDao->queryByPlan($templateId);
            // var_dump($plandates);
            $planDisplay = $this->createPlanDisplayRows($plan['weeks_duration'], $plandates, $targetEndDate);
            echo '<hr/>';
            var_dump($planDisplay);
            echo '<hr/>';
            
            foreach ($planDisplay as & $value) {
                var_dump($value);
                if ($value['content'] != '') {
                    echo ' ==send it:' . $value['content'] . ":" . $value['date'];
                    $resource->sendToGcal($gClient, $value['content'], '', $value['date']);
                }
            }

            echo 'Sent to Calendar';
        };
    }

    public function createPlanDisplayRows($numberOfWeeks, $plandates, $targetEndDate)
    {
        $planDisplay = array();
        $endDateTimestamp = strtotime($targetEndDate);
        $daysInPlan = $numberOfWeeks * 7;
 
        DevHelp::debugMsg('daysInPlan ' . $daysInPlan);
        DevHelp::debugMsg('$targetEndDate ' . $targetEndDate);

        for ($i = 0; $i <= $daysInPlan; $i++) {
            DevHelp::debugMsg('i: ' . $i);

            $foundInPlan = $this->foundInPlan($i, $plandates);

            $newdate = strtotime('-' . $i . ' days', $endDateTimestamp);
            $displayRow = array();
            $displayRow['date'] = date("Y-m-d", $newdate);
            $displayRow['day'] = date("D", $newdate);
            $displayRow['content'] = ($foundInPlan) ? $foundInPlan['content'] : '';

            array_push($planDisplay, $displayRow);
        }

        return array_reverse($planDisplay);
    }

    public function foundInPlan($i, $plandates)
    {
        for ($j = 0; $j < count($plandates); $j++) {
            if ($plandates[$j]['days_from_target'] == $i) {
                return $plandates[$j];
            }
        }
        return null;
    }
}
