<?php
define('PLANS', 'cpc_templates');

class PlansRedbeanDAO
{
    /**
     * Get all records from table ordered by field
     *
     * @param $orderColumn column name
     */
    public function queryAllOrderBy($orderColumn)
    {
        $plans = R::findAll(PLANS, ' order by ?', [$orderColumn]);
        $sequencedArray = array_values(array_map("getExportValues", $plans));
        
        return $sequencedArray;
    }

    public function load($id)
    {
        $plan = R::load(PLANS, $id);
        return $plan->export();
    }
    public function insert($description, $weeks_duration)
    {
        $plan = R::xdispense(PLANS);
        $plan->description = $description;
        $plan->weeks_duration = $weeks_duration;
        $id = R::store($plan);
        $plan->id = $id;
        return $plan;
    }

    public function delete($id)
    {
        $xBean = R::load(PLANS, $id);
        R::trash($xBean);
        return 1;
    }
}

function getExportValues($item)
{
    return $item->export();
}
