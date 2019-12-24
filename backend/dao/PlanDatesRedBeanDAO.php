<?php
define('PLANDATES', 'cpc_plandates');

class PlanDatesRedBeanDAO
{
    public function queryByPlan($planId)
    {
        $plans = R::findAll(PLANDATES, ' template_id = ?  order by days_from_target', [$planId]);
        $sequencedArray = array_values(array_map("getExportValues", $plans));
        
        return $sequencedArray;
    }

    public function updateTemplatePlan($templateId, $days_from_target, $value)
    {
        echo $templateId .':'. $days_from_target.':'.$value;
        $plandate  = R::findOne(PLANDATES, ' template_id = ? and days_from_target = ?', [$templateId, $days_from_target]);
        if ($plandate == null) {
            $plandate = R::xdispense(PLANDATES);
            $plandate->template_id = $templateId;
            $plandate->days_from_target = $days_from_target;
        }
        echo ' rb: '. $value;
        $plandate->content = $value;
        R::store($plandate);
        return;
    }
}
