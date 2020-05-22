<?php namespace tracker;

define('PLANS', 'cpc_templates');
/**
 * PlansRedbeanDAO
 *
 * PHP Version 7.0
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
class PlansRedbeanDAO
{
    /**
     * Get all records from table ordered by field
     *
     * @param $orderColumn column name
     */
    public function queryAllOrderBy($orderColumn)
    {
        $plans = \R::findAll(PLANS, ' order by ?', [$orderColumn]);
        $sequencedArray = array_values(array_map(function ($item){
            return $item->export();
            }, $plans));
        
        return $sequencedArray;
    }

    public function load($id)
    {
        $plan = \R::load(PLANS, $id);
        return $plan->export();
    }
    public function insert($description, $weeks_duration)
    {
        $plan = \R::xdispense(PLANS);
        $plan->description = $description;
        $plan->weeks_duration = $weeks_duration;
        $id = \R::store($plan);
        $plan->id = $id;
        return $plan;
    }

    public function delete($id)
    {
        $xBean = \R::load(PLANS, $id);
        R::trash($xBean);
        return 1;
    }
}

