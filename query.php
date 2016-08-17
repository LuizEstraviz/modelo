<?php 
if (isset($_GET['query'])) {
	if(!@($conexao=pg_connect ("host=apoema.esalq.usp.br dbname=modelo port=5432 user=getlidar password=***REMOVED***"))) {
		print "Não foi possível estabelecer uma conexão com o banco de dados.";
	} else {
   		print $_GET['query'];
	}
} else {
    print 'Query nao tah definida';
}
?>