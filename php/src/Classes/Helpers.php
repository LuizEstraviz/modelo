<?php 
namespace Classes;

require "../../vendor/autoload.php";

class Helpers {
	public static function convertArrayToKeyArray($arr) {
		$keyArr = [];
		foreach ($arr as $i) {
			$keyArr[$i] = 0;
		}
		return $keyArr;
	}
}