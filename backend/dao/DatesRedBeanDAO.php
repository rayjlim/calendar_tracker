<?php
define('DATES', 'cpc_dates');

class DatesRedBeanDAO
{
    /**
     * Get all records from table ordered by field
     *
     * @param $orderColumn column name
     */
    public function queryAllOrderBy() {
        $tracks = R::findAll(DATES, ' order by date');
        $sequencedArray = array_values(array_map("getExportValues", $tracks));
        return $sequencedArray;
    }

    public function load($id) {
        $date = R::load(DATES, $id);
        return $date->export();
    }

    public function insert($targetDate, $templateId, $detail, $goal) {
    	$dateObj = R::xdispense( DATES );
        $dateObj->date = $targetDate;
        $dateObj->templateId = $templateId;
        $dateObj->detail = $detail;
        $dateObj->goal = $goal;
        $id = R::store( $dateObj );
        $dateObj->id = $id;
        return $dateObj;
    }

    public function deleteByTemplateId($templateId) {
        $dates = R::find(DATES, 'template_id = ?', [$templateId]);
        R::trashAll( $dates );
    }

    public function getDatesBetween($start, $end) {
        $tracks = R::findAll(DATES, ' date >= ? and date <= ? order by date', [$start, $end]);
        $sequencedArray = array_values(array_map("getExportValues", $tracks));
        return $sequencedArray;
    }

    public function getPlansInCalendar() {
        $templates = R::getAll('SELECT distinct template_id, ct.* from cpc_dates cd, cpc_templates ct where cd.template_id = ct.id');
        // $sequencedArray = array_values(array_map("getExportValues", $templates));
        return $templates;
    }

}


