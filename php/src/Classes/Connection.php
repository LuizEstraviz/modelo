<?php
namespace Classes;

use Classes\Helpers;

class Connection
{
	private $fields;
	private $row;
	private $rowid = 0;
	private $geomIndexesKey;
	private $features;
	private $data;
	public $numFields;
	public $results;
	
	function __construct($connectionString)
	{
		$this->features = [];
		$this->data = [];
		pg_connect($connectionString);
	}

	

	function close() 
	{
		pg_close();
	}

	function query($query)
	{
		$this->results = pg_query($query) or die(pg_last_error());
		$this->numFields = pg_num_fields($this->results);
		$this->fields = $this->getFields();
		$this->geomIndexesKey = (array_flip($this->getGeometryIndexes()));
	}

	function hasGeometry() 
	{
		
		for ($i = 0; $i < $this->numFields; $i++) {
		    $f = pg_field_type($this->results, $i);
		    if ($f == "geometry")
		    	return true;
		}
		return false;
	}

	private function getGeometryIndexes() {
		if (!$this->hasGeometry())
			return [-1];

		$indexes = [];

		for ($i = 0; $i < $this->numFields; $i++) {
		    $type = pg_field_type($this->results, $i);
		    if ($type == "geometry")
		    	$indexes[] = $i;
		}
		return $indexes;
	}

	function getFields() {
		$fields = [];

		for ($i = 0; $i < $this->numFields; $i++) {
		    $type = pg_field_name($this->results, $i);
		    $fields[] = $type;
		}
		return $fields;
	}

	function getFieldsNotGeometry() {
		return array_diff_key($this->fields, $this->geomIndexesKey);
	}

	function getFieldsGeometry() {
		return array_intersect_key($this->fields, $this->geomIndexesKey);
	}

	private function nextRow() {
		$this->row = pg_fetch_row($this->results);
	}

	private function readRowData() {
		$this->nextRow();
		$this->data[] = $this->getArrayNotGeometry($this->row);
		$this->features[] = $this->getRowAsGeoJSON();
	}

	function getNextRow() {
		$this->nextRow();
		if ($this->row == false) return false;
		return $this->row;
	}

	function getNextRowNotGeometry() {
		$this->getNextRow();
		return $this->getRowNotGeometry();
	}

	function getRowNotGeometry() {
		return $this->getArrayNotGeometry($this->row);	
	}

	private function getArrayNotGeometry($arr) {
		if ($arr == false) return false;
		return array_diff_key($arr, $this->geomIndexesKey);
	}

	private function getArrayGeometry($arr) {
		if ($arr == false) return false;
		return array_intersect_key($arr, $this->geomIndexesKey);
	}

	function getNextRowGeometry() {
		$this->getNextRow();
		return $this->getArrayGeometry($this->row);
	}

	function getNextAsGeoJSON() {
		$this->getNextRow();
		return $this->getRowAsGeoJSON();
	}

	private function getRowAsGeoJSON() {
		if ($this->row == false) return false;
		$geoms = $this->getArrayGeometry($this->row);
		$fields = $this->getFieldsNotGeometry();
		$data = $this->getArrayNotGeometry($this->row);
		$data_arr = array_combine($fields, $data);
		$feats = [];
		foreach ($geoms as $geom) {
			$feats[] = $this->convertGeomAsGeoJSON($geom);
		}
		$this->rowid++;
		return $feats;
	}

	private function convertGeomAsGeoJSON($geom) {
		if (!$geom) return false;
		$results = pg_query("SELECT ST_asGeoJson(ST_Transform('$geom'::geometry, 3857))");

		$geoJson = pg_fetch_row($results)[0];
		$feat = '{';
		$feat .= '"type":"Feature",';
		$feat .= '"geometry":' . $geoJson . ',';
		$feat .= '"properties":{"row":' . $this->rowid . '}}';
		return $feat;
	}

	function getAllGeoJSON() {
		$rows = [];
		while ($row = $this->getNextAsGeoJSON())
		{
			foreach ($row as $geom) {
				$rows[] = $geom;
			}
		}
		return $rows;
	}

	private function decorateFeatureCollection($feats) {
		return '{"type":"FeatureCollection","features":[' . join(',',$feats) . ']}';
	}

	function getAll() {
		if (!headers_sent())
			header("Content-type: application/json");
		$result = '{"fields":';
		$result .= json_encode(array_values($this->getFieldsNotGeometry())) . ',';
		$result .= '"data":';
		$data = [];
		$feats = [];
		while ($this->getNextRow()) 
		{
			if (!$this->row) break;
			$data[] = array_values($this->getRowNotGeometry());
			foreach ($this->getRowAsGeoJSON() as $geom) 
			{
				if ($geom)
					$feats[] = $geom;
			}
		}
		$result .= json_encode($data, JSON_NUMERIC_CHECK) . ',';
		$result .= '"geo":';
		$result .= $this->decorateFeatureCollection($feats) . '}';
		return $result;
	}

}