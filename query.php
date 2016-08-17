<?php 
if (isset($_GET['query'])) {
    print $_GET['query'];
} else {
    print 'Query nao tah definida'
}
?>