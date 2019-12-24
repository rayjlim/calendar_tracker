<?php
use \Lpt\DevHelp;

/**
 *   This class will handle the Create, Update, Delete Functionality
 *   for the Entrys
 */
class PlanHandler extends AbstractController
{
    public $dao = null;
    public function __construct($app, $_planDao)
    {
        $this->dao = $_planDao;
        parent::__construct($app);
    }

    public function addEntry()
    {
        return function () {
            DevHelp::debugMsg('start add' . __FILE__);
            
            $request = $this->app->request();
            
            // $entry = json_decode($request->getBody());
            $description = $request->params('description');
            $weeks_duration = $request->params('weeks_duration');
            $newPlan =  $this->dao->insert($description, $weeks_duration);
            
            echo json_encode($newPlan);
        };
    }
    
    public function updateEntry()
    {
        $me = $this;
        return function ($id) use ($me) {
            DevHelp::debugMsg('start update' . __FILE__);
            
            $request = \Slim\Slim::getInstance()->request();
            $entry = json_decode($request->getBody());
            
            $smsEntry = $me->updateEntryUnit(DAOFactory::getSmsEntriesDAO(), DAOFactory::getResourceDAO(), $entry, $id);
            echo json_encode($smsEntry);
        };
    }
    
    public function updateEntryUnit($iDao, $iResource, $entry, $id)
    {
        $smsEntry = $iDao->load($id);
        
        if ($iResource->getSession(SESSION_USER_ID) != $smsEntry->userId) {
            throw new Exception('Invalid User');
        }
        
        $smsEntry->content = SmsEntrie::sanitizeContent($entry->content);
        $smsEntry->date = $entry->date;
        $iDao->update($smsEntry);
        
        return $smsEntry;
    }
    
    public function deleteEntry()
    {
        $me = $this;
        return function ($id) use ($me) {
            DevHelp::debugMsg('start delete' . __FILE__);
            
            $this->dao->delete($id);
            // echo '{"rows_affected": ' . $rows_affected . '}';
            echo ' deleted ';
        };
    }

    
    public function saveTemplateDates()
    {
        return function () {
            $planDatesDao = DAOFactory::getPlandatesDAO();
            $request = $this->app->request();
            var_dump($request->params());
            $templateId = $request->params('templateId');
            foreach ($request->params() as $key => $value) {
                if (strpos($key, 'pdate') === 0) {
                    $day_from_target = substr($key, 5);
                    echo 'saving: ' . $day_from_target . ':' . $value . ':' . $templateId;
                    $planDatesDao->updateTemplatePlan($templateId, $day_from_target, $value);
                    echo '<br>';
                }
            }
            echo 'done';
        };
    }

    public function publish()
    {
        return function () {
            $planDatesDao = DAOFactory::getPlandatesDAO();
            $datesDao = DAOFactory::getDatesDAO();
            $request = $this->app->request();
            var_dump($request->params());
            echo '<br>';
            $planId = $request->params('planId');
            $endDate = $request->params('endDate');
            $goal = $request->params('goal');
            
            // remove existing from dates table

            $datesDao->deleteByTemplateId($planId);
            $date=date_create($endDate);
            echo date_format($date, "Y-m-d");
            echo $goal;

            //save
            $plandates = $planDatesDao->queryByPlan($planId);
            $plandatesContent = array_filter($plandates, "hasContent");

            foreach ($plandatesContent as $key => $value) {
                $target =  (new \DateTime(date_format($date, "Y-m-d")))->modify('-'.$key." days");
                $datesDao->insert(date_format($target, "Y-m-d"), $value['template_id'], $value['content'], $goal);
            }
            echo 'done';
        };
    }

    public function deleteDatesPlan()
    {
        return function ($id) {
            $request = $this->app->request();
            $datesDao = DAOFactory::getDatesDAO();


            echo $id.'<br>';
            $datesDao->deleteByTemplateId($id);
            // $planId = $request->params('planId');
            // $endDate = $request->params('endDate');
            
            // // remove existing from dates table

            // $datesDao->deleteByTemplateId($planId);
            //  $date=date_create($endDate);
            // echo date_format($date,"Y-m-d");
            // //save
            // $plandates = $planDatesDao->queryByPlan($planId);
            // $plandatesContent = array_filter($plandates, "hasContent");

            // foreach ($plandatesContent as $key => $value) {
            // $target =  (new \DateTime(date_format($date,"Y-m-d")))->modify('-'.$key." days");
            // $datesDao->insert(date_format($target,"Y-m-d"), $value['template_id'], $value['content']);
            // }
            echo 'done';
        };
    }
}

function hasContent($x)
{
    return $x['content'] !== '';
}
