<?php 

include 'query.conf.php';

$limite = 100;
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
	fputcsv($output, getFieldsAsArray($results));

	//Data
	while ($row = pg_fetch_row($results)) {
		fputcsv($output, $row);
	}

	fclose($output);
}

function returnDataAsJSON($queryResult) {
	// Create $dataArray with campos and dados
	$dataObject = array();

	//Populate campos
	$dataObject['campos'] = getFieldsAsArray($results);
	$i = 0;

	// Add $row from $results in $dataObject['dados'] unless limit exceeds
	while ($row = pg_fetch_row($results) and $i < $limite) {
		$dataObject['dados'][] = $row;
		$i++;
	}
	print json_encode($dataObject);
}

if (isset($_GET['query'])) {
	// Open connection or throw error
	if(!@($conexao=pg_connect ("host=apoema.esalq.usp.br dbname=modelo port=5432 user=$usr password=$pwd"))) {
		die('Não foi possível estabelecer uma conexão com o banco de dados.');
	} else {
		// Run query defined by 'query' parameter or throw error
		$results = pg_query($_GET['query']) or die(pg_last_error());

		// Check if output is csv or JSON
		if (isset($_GET['ascsv']) and $_GET['ascsv'])
		{
			returnDataAsCSV($results);
		} else {
			returnDataAsJSON($results);
   		}
	}
} else {
    die('Erro: Consulta em branco!');
}
?>