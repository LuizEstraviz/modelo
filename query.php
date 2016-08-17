<?php 

if (isset($_GET['query'])) {
	if(!@($conexao=pg_connect ("host=apoema.esalq.usp.br dbname=modelo port=5432 user=getlidar password=***REMOVED***"))) {
		print "Não foi possível estabelecer uma conexão com o banco de dados.";
	} else {
		$results = pg_query($_GET['query']) or die('Query failed: ' . pg_last_error());
		$myarray = array();
		while ($row = pg_fetch_row($results)) {
  			$myarray[] = $row;
		}
   		print json_encode($myarray);
	}
} else {
    print 'Query nao tah definida';
}
?>