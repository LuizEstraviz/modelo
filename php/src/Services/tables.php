<?php 
namespace Services;

require __DIR__ . "/../../vendor/autoload.php";
use Classes\Connection;

// Remove default messages
error_reporting(E_ERROR | E_PARSE);

$c = new Connection('host=127.0.0.1 dbname=modelo port=5432 user=getlidar');

// Open connection or throw error
	// Run query defined by 'query' parameter or throw error
	$c->query('SELECT tables_json FROM v_tables');

	// Check if output is csv or JSON
	print $c->getSingleResult($results);
		pg_close();