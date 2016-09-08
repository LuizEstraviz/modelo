<?php 

require "../../vendor/autoload.php";
use Classes\Connection;
namespace Services;

// Remove default messages
error_reporting(E_ERROR | E_PARSE);

function getFieldsAsArray($queryResult) {
	$fields = array();
	for ($j = 0; $j < pg_num_fields($queryResult); $j++) {
		$fields[] = pg_field_name($queryResult, $j);
	}
	return $fields;
}

function returnDataAsCSV($queryResult) {
	header("Content-type: text/csv");
	header("Content-Disposition: attachment; filename=file.csv");
	header("Pragma: no-cache");
	header("Expires: 0");

	// Create temporary csv file
	$output = fopen("php://output", "w");

	// Header
	fputcsv($output, getFieldsAsArray($queryResult), $delimiter = ';');

	//Data
	while ($row = pg_fetch_row($queryResult)) {
		fputcsv($output, $row, $delimiter = ';');
	}

	fclose($output);
}

function returnDataAsJSON($queryResult) {
	$limite = 100;

	// Create $dataArray with campos and dados
	$dataObject = array();

	//Populate campos
	$dataObject['campos'] = getFieldsAsArray($queryResult);
	$i = 0;

	// Add $row from $results in $dataObject['dados'] unless limit exceeds
	while ($row = pg_fetch_row($queryResult) and $i < $limite) {
		$dataObject['dados'][] = $row;
		$i++;
	}
	print json_encode($dataObject);
}

if (isset($_GET['query']) and $_GET['query'] != '') {
	$c = new Connection('host=127.0.0.1 dbname=modelo port=5432 user=getlidar');
	
	// Open connection or throw error
		// Run query defined by 'query' parameter or throw error
		$c->query($_GET['query']) or die(pg_last_error());

		// Check if output is csv or JSON
		if (isset($_GET['ascsv']) and $_GET['ascsv'] == 'true')
		{
			returnDataAsCSV($results);
		} else {
			print $c->getAll($results);
   		}
   		pg_close();
} else {
    print 'Erro: Consulta em branco';
}