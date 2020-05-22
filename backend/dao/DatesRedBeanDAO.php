<?php
/**
 * DatesRedBeanDAO.php
 *
 * PHP Version 7.0
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
define('DATES', 'cpc_dates');
/**
 * DatesRedBeanDAO
 *
 * @category Personal
 * @package  Default
 * @author   Raymond Lim <rayjlim1@gmail.com>
 * @license  lilplaytime http://www.lilplaytime.com
 * @link     www.lilplaytime.com
 */
class DatesRedBeanDAO
{
    /**
     * Get all records from table ordered by field
     *
     * @return $sequencedArray Array of records
     */
    public function queryAllOrderBy()
    {
        $tracks = R::findAll(DATES, ' order by date');
        $sequencedArray = array_values(array_map("getExportValues", $tracks));
        return $sequencedArray;
    }
    /**
     * Load
     *
     * @param $id Date table Id
     *
     * @return $date row
     */
    public function load($id)
    {
        $date = R::load(DATES, $id);
        return $date->export();
    }
    /**
     * Insert
     *
     * @param $targetDate date
     * @param $templateId template
     * @param $detail     more info
     * @param $goal       category
     *
     * @return $dateobj created date
     */
    public function insert($targetDate, $templateId, $detail, $goal)
    {
        $dateObj = R::xdispense(DATES);
        $dateObj->date = $targetDate;
        $dateObj->templateId = $templateId;
        $dateObj->detail = $detail;
        $dateObj->goal = $goal;
        $id = R::store($dateObj);
        $dateObj->id = $id;
        return $dateObj;
    }
    /**
     * DeleteByTemplateId
     *
     * @param $templateId template
     *
     * @return none
     */
    public function deleteByTemplateId($templateId)
    {
        $dates = R::find(DATES, 'template_id = ?', [$templateId]);
        R::trashAll($dates);
    }
    /**
     * GetDatesBetween
     *
     * @param $start start date
     * @param $end   end date
     *
     * @return $sequencedArray found rows
     */
    public function getDatesBetween($start, $end)
    {
        $tracks = R::findAll(
            DATES,
            ' date >= ? and date <= ? order by date',
            [$start, $end]
        );
        $sequencedArray = array_values(array_map("getExportValues", $tracks));
        return $sequencedArray;
    }
    /**
     * GetPlansInCalendar
     *
     * @return $templates
     */
    public function getPlansInCalendar()
    {
        $templates = R::getAll(
            'SELECT distinct template_id, ct.* '
            .'from cpc_dates cd, cpc_templates ct '
            .'where cd.template_id = ct.id'
        );
        // $sequencedArray = array_values(array_map("getExportValues", $templates));
        return $templates;
    }
}
