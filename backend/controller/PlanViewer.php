<?php
use \Lpt\DevHelp;

class PlanViewer extends AbstractController
{
    public $dao = null;
    public function __construct($app, $_planDao)
    {
        $this->dao = $_planDao;
        parent::__construct($app);
    }

    public function listItems()
    {
        return function () {
            $app = $this->app;
            DevHelp::debugMsg('start listItems ' . __FILE__);
            $plans = $this->dao->queryAllOrderBy('weeks_duration');

            $_SESSION['state'] = hash('sha256', microtime(true).rand().$_SERVER['REMOTE_ADDR']);
            //GOOGLE
            $gAuthorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth?';
            $googleRedirectUrl = 'http://' . $_SERVER['SERVER_NAME'] .'/cal_plan_creator/google-login-callback.php';
            $gParams = array(
              'client_id' => GOOGLE_CLIENT_ID,
              'response_type' => 'code',
              'scope'=>'openid email',
              'redirect_uri' => $googleRedirectUrl,
              'state' => $_SESSION['state']
            );
            $googleLoginUrl = $gAuthorizeUrl . http_build_query($gParams);
            $datesDao = DAOFactory::getDatesDAO();
            $plansInCalendar = $datesDao->getPlansInCalendar();
            
            $viewModel = array('plans' => $plans,
                'hasGoogleToken' =>isset($_SESSION[SESSION_GOOGLE_TOKEN]),
                'googleLoginUrl' => $googleLoginUrl,
                'plansInCalendar' => $plansInCalendar
                );
            $app->render('plans.twig', $viewModel);
        };
    }

    public function itemDetails()
    {
        return function ($id) {
            DevHelp::debugMsg('start itemDetails ' . __FILE__);
            $app = $this->app;
            $templateId = $app->request()->params('templateId');
            $plan = $this->dao->load($templateId);

            $planDatesDao = DAOFactory::getPlandatesDAO();
            $plandates = $planDatesDao->queryByPlan($templateId);

            $targetEndDate = $app->request()->params('targetEndDate');

            DevHelp::debugMsg('id ' . $templateId);
            DevHelp::debugMsg('targetEndDate ' . $targetEndDate);

            // DevHelp::debugMsg('plab ' . $plan);
            // var_dump($plandates);
            $planDisplay = $this->createPlanDisplayRows($plan['weeks_duration'], $plandates, $targetEndDate);
            DevHelp::debugMsg('planDisplay--- ');

            $viewModel = array('plan' => $plan,
                'targetEndDate' => $targetEndDate,
                'templateSize' => count($planDisplay),
                'plandates' => $planDisplay);

            $app->render('plan_dates.twig', $viewModel);
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

    public function viewDates()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
        
            $month = $request->params('month') !== null ? $request->params('month') : (new DateTime())->format('n');
            $year = $request->params('year') !== null ? $request->params('year') : (new DateTime())->format('Y');

            if ($month > 12) {
                $month = 1;
                $year++;
            }
            if ($month < 1) {
                $month = 12;
                $year--;
            }

            $headings = array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
            $weeks = makeCalendarData($month, $year);

            $viewModel = array('month' => $month,
                'year' => $year,
                'headings' => $headings,
                'weeks' => $weeks
                );
            $app->render('calendar.twig', $viewModel);
        };
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

    public function createDate()
    {
        return function () {
            $app = $this->app;
            $request = $app->request();
            echo $request->params('goal');
            echo $request->params('detail');
            echo $request->params('date');
            $templateId = -1;

            $datesDao = DAOFactory::getDatesDAO();
            $datesDao->insert($request->params('date'), $templateId, $request->params('detail'), $request->params('goal'));
        };
    }
}


/* draws a calendar */
function makeCalendarData($month, $year)
{
    $datesDao = DAOFactory::getDatesDAO();
    $logsDao = DAOFactory::getLogsDAO();
    $weeks = [];

    /* days and weeks vars now ... */
    $running_day = date('w', mktime(0, 0, 0, $month, 1, $year));
    $days_in_month = date('t', mktime(0, 0, 0, $month, 1, $year));
    $days_in_this_week = 1;
    $day_counter = 0;
    $dates_array = array();

    /* row for week one */
    $week = [];

    /* print "blank" days until the first of the current week */
    for ($x = 0; $x < $running_day; $x++) :
        $obj1 = new \stdClass;
        $obj1->num = 'x';
        $obj1->goals = [];
        array_push($week, $obj1);

        $days_in_this_week++;
    endfor;

    /* keep going with days.... */
    for ($list_day = 1; $list_day <= $days_in_month; $list_day++) :
        $obj1 = new stdClass;
        $obj1->num = $list_day;
        $obj1->goals = [];
        $obj1->logs = [];
        
        $targetDate = $year.'-'.$month.'-'.$list_day;
        $dates = $datesDao->getDatesBetween($targetDate, $targetDate);

        $params = new stdClass();
        $params->goal = '%';
        $params->start = date("Y-m-d", strtotime($targetDate));
        $params->end =  date("Y-m-d", strtotime($targetDate));
                
        $datesLog = $logsDao->get($params);
        $current = new DateTime($targetDate);
        $today = new DateTime((new DateTime())->format('Y-n-j'));

        if ($current == $today) {
            $obj1->today = true;
        } elseif ($current < $today) {
            $obj1->passed = true;
        }

        foreach ($dates as $date) {
            // $calendar.= '<p>'.$date['detail'].'</p>';
            $obj2 = new stdClass;
            $obj2->goal = $date['goal'];
            $obj2->detail = $date['detail'];

            array_push($obj1->goals, $obj2);
        }
        foreach ($datesLog as $date) {
            // $calendar.= '<p>'.$date['detail'].'</p>';
            array_push($obj1->logs, $date['goal']. ' '.$date['count'].' '.$date['comment']);
        }
        // $calendar.= '</td>';
        array_push($week, $obj1);

        if ($running_day == 6) :
            // $calendar.= '</tr>';
                array_push($weeks, $week);
            $week = [];
            $running_day = -1;
            $days_in_this_week = 0;
        endif;
        $days_in_this_week++;
        $running_day++;
        $day_counter++;
    endfor;

    /* finish the rest of the days in the week */
    if ($days_in_this_week < 8) :
        for ($x = 1; $x <= (8 - $days_in_this_week); $x++) :
            // $calendar.= '<td class="calendar-day-np"> </td>';
                    $obj1 = new \stdClass;
            $obj1->num = 'x';
            $obj1->detail = [];
            array_push($week, $obj1);
        endfor;
    endif;
    
    array_push($weeks, $week);
    /* all done, return result */
    return $weeks;
}
