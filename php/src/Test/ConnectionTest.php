<?php

use PHPUnit\Framework\TestCase;
use Classes\Connection;

class ConnectionTest extends TestCase
{
	protected $c;

	protected function setUp() {
		$connectionString = "host=localhost dbname=teste port=5432 user=test";
		$this->c = new Connection($connectionString);
	}

    public function testQuery()
    {
    	$this->c->query("SELECT 1");
    }

    public function testHasGeometryFalse() {
		$this->c->query("SELECT 1");
		$this->assertFalse($this->c->hasGeometry());
    }

    public function testHasGeometryTrue() {
		$this->c->query("SELECT ST_PointFromText('POINT(0 0)', 3857) geom");
		$this->assertTrue($this->c->hasGeometry());
    }

    public function testGetFieldsExists() {
    	$this->c->query("SELECT 1 id_talhao");
    	$this->c->getFields();
    }

    public function testGetFields() {
    	$this->c->query("SELECT 1 tatu, 2 bola");
    	$this->assertEquals(["tatu", "bola"], $this->c->getFields());
    }

    public function testGetFieldsNotGeometryExists() {
    	$this->c->query("SELECT 1 tatu, 2 bola");
    	$this->c->getFieldsNotGeometry();
    }

    public function testGetFieldsNotGeometryNormal() {
    	$this->c->query("SELECT 1 tatu, 2 bola");
    	$this->assertEquals(["tatu", "bola"], $this->c->getFieldsNotGeometry());	
    }

    public function testGetFieldsNotGeometrySingleGeometry() {
    	$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(1 1)', 3857) sai, 2 bola");
    	$this->assertEquals([0=>"tatu", 2=>"bola"], $this->c->getFieldsNotGeometry());	
    }

    public function testGetFieldsNotGeometryMultiGeometry() {
    	$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(1 1)', 3857) sai, ST_PointFromText('POINT(1 1)', 3857) sai2, 2 bola");
    	$this->assertEquals([0=>"tatu", 3=>"bola"], $this->c->getFieldsNotGeometry());
    }

    public function testGetFieldsGeometrySingleGeometry() {
    	$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(1 1)', 3857) geom, 2 bola");
    	$this->assertEquals([1=>"geom"], $this->c->getFieldsGeometry());	
    }

    public function testGetFieldsGeometryMultiGeometry() {
    	$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(1 1)', 3857) geom, 2 bola, ST_PointFromText('POINT(1 2)', 3857) geom2");
    	$this->assertEquals([1=>"geom", 3=>"geom2"], $this->c->getFieldsGeometry());	
    }

	public function testGetNextRowExists() {
		$this->c->query("SELECT 1 tatu, 2 bola");
		$this->c->getNextRow();
	}    

	public function testGetNextRow() {
		$this->c->query("SELECT 1 tatu, 2 bola");
		$this->assertEquals([1,2], $this->c->getNextRow());
	}

	public function testGetNextRowNotGeometryNormal() {
		$this->c->query("SELECT 1 tatu, 2 bola");
		$this->assertEquals([1,2], $this->c->getNextRowNotGeometry());
	}

	public function testGetNextRowNotGeometrySingleGeom() {
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->assertEquals([0=>1,2=>2], $this->c->getNextRowNotGeometry());
	}

	public function testGetNextRowNotGeometryMultiGeom() {
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->assertEquals([0=>1,2=>2], $this->c->getNextRowNotGeometry());
	}

	public function testGetNextRowGeometryNoGeom() {
		$this->c->query("SELECT 1 tatu, 2 bola");
		$this->assertEquals([], $this->c->getNextRowGeometry());
	}

	public function testGetNextRowGeometrySingleGeom() {
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->assertEquals([1=>'0101000020110F000000000000000000000000000000000000'], $this->c->getNextRowGeometry());
	}

	public function testGetNextRowGeometryMultiGeom() {
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola,ST_PointFromText('POINT(0 0)', 3857) geom2");
		$this->assertEquals([1=>'0101000020110F000000000000000000000000000000000000', 3=>'0101000020110F000000000000000000000000000000000000'], $this->c->getNextRowGeometry());
	}

	public function testGetNextAsGeoJSONExists() {	
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->c->getNextAsGeoJSON();
	}

	public function testGetNextAsGeoJSONSingleGeom() {	
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->assertEquals(['{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}'], $this->c->getNextAsGeoJSON());
	}

	public function testGetNextAsGeoJSONMultiGeom() {	
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola,ST_PointFromText('POINT(0 0)', 3857) geom2");
		$this->assertEquals(['{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}','{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}'], $this->c->getNextAsGeoJSON());
	}

	public function testGetAllGeoJSON() {	
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola UNION ALL SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola");
		$this->assertEquals(['{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}','{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":1}}'], $this->c->getAllGeoJSON());
	}

	public function testGetAllGeoJSONMulti() {	
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola,ST_PointFromText('POINT(0 0)', 3857) geom2 UNION ALL SELECT 6 tatu, ST_PointFromText('POINT(0 1)', 3857) geom, 2 bola, ST_PointFromText('POINT(0 1)', 3857) geom2");
		$this->assertEquals(['{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}','{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}}','{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}}','{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}}'], $this->c->getAllGeoJSON());
	}

	public function testGetAll(){
		$this->c->query("SELECT 1 tatu, ST_PointFromText('POINT(0 0)', 3857) geom, 2 bola,ST_PointFromText('POINT(0 0)', 3857) geom2 UNION ALL SELECT 6 tatu, ST_PointFromText('POINT(0 1)', 3857) geom, 2 bola, ST_PointFromText('POINT(0 1)', 3857) geom2");
		$this->assertEquals('{"fields":["tatu","bola"],"data":[[1,2],[6,2]],"geo":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}}]}}', $this->c->getAll());	
	}

	public function testGetAllOnlyFeature(){
		$this->c->query("SELECT ST_PointFromText('POINT(0 0)', 3857) geom, ST_PointFromText('POINT(0 0)', 3857) geom2 UNION ALL SELECT ST_PointFromText('POINT(0 1)', 3857) geom, ST_PointFromText('POINT(0 1)', 3857) geom2");
		$this->assertEquals('{"fields":[],"data":[[],[]],"geo":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{"row":0}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}},{"type":"Feature","geometry":{"type":"Point","coordinates":[0,1]},"properties":{"row":1}}]}}', $this->c->getAll());	
	}

	public function testGetAllOnlyData(){
		$this->c->query("SELECT 1 tatu, 2 bola UNION ALL SELECT 6 tatu, 2 bola");
		$this->assertEquals('{"fields":["tatu","bola"],"data":[[1,2],[6,2]],"geo":{"type":"FeatureCollection","features":[]}}', $this->c->getAll());	
	}


}