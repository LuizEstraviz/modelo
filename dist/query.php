<?php 

include 'query.conf.php';

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
	// Open connection or throw error
	if(!@($conexao=pg_connect ("host=apoema.esalq.usp.br dbname=modelo port=5432 user=$usr password=$pwd"))) {
		print 'Não foi possível estabelecer uma conexão com o banco de dados.';
	} else {
		// Run query defined by 'query' parameter or throw error
		$results = pg_query($_GET['query']) or die(pg_last_error());

		// Check if output is csv or JSON
		if (isset($_GET['ascsv']) and $_GET['ascsv'] == 'true')
		{
			returnDataAsCSV($results);
		} else {
			returnDataAsJSON($results);
   		}
	}
} else {
    print 'Erro: Consulta em branco';
}
?>