<?php 
$limite = 100;

if (isset($_GET['query'])) {
	if(!@($conexao=pg_connect ("host=apoema.esalq.usp.br dbname=modelo port=5432 user=getlidar password=***REMOVED***"))) {
		print "Não foi possível estabelecer uma conexão com o banco de dados.";
	} else {
		$results = pg_query($_GET['query']) or die('Query failed: ' . pg_last_error());
		$fields = array();
		for ($j = 0; $j < pg_num_fields($results); $j++) {
			$fields[] = pg_field_name($results, $j);
		}
		$myarray = array();
		$myarray['campos'] = $fields;
		$i = 0;
		while ($row = pg_fetch_row($results) and $i < $limite) {
  			$myarray['dados'][] = $row;
  			$i++;
		}
   		print json_encode($myarray);
	}
} else {
    print 'Query nao tah definida';
}
?>