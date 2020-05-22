<?php namespace tracker;

define('TRACKS', 'cpc_tracks');

class TracksRedbeanDAO
{
    /**
     * Get all records from table ordered by field
     *
     * @param $orderColumn column name
     */
    public function queryAllOrderBy($orderColumn)
    {
        $tracks = \R::findAll(TRACKS, ' order by ?', [$orderColumn]);
        $sequencedArray = array_values(array_map(function ($item){
    return $item->export();
    }, $tracks));
        return $sequencedArray;
    }
    public function getActive()
    {
        $tracks = \R::findAll(TRACKS, ' is_archived = 0');
        // $sequencedArray = array_values(array_map(function ($item){
    // return $item->export();
    // }, $tracks));
        return $tracks;
    }


    public function load($id)
    {
        $track = \R::load(TRACKS, $id);
        return $track->export();
    }

    public function insert($name, $shortcode, $points, $type)
    {
        $track = \R::xdispense(TRACKS);
        $track->name = $name;
        $track->shortcode = $shortcode;
        $track->points = $points;
        $track->type = $type;
        $id = \R::store($track);
        $track->id = $id;
        return $track;
    }

    public function delete($id)
    {
        $xBean = \R::load(TRACKS, $id);
        R::trash($xBean);
        return;
    }

    public function toggleDisable($id)
    {
        $track = \R::load(TRACKS, $id);
        $track->is_archived = !$track->is_archived;
        R::store($track);
        return;
    }
}
