<?php 

require "../../vendor/autoload.php";
namespace Classes;

class Helpers {
	public static function convertArrayToKeyArray($arr) {
		$keyArr = [];
		foreach ($arr as $i) {
			$keyArr[$i] = 0;
		}
		return $keyArr;
	}
}