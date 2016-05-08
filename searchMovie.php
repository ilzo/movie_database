<?php
require_once('./includes/connect.php');

try {
if(preg_match("/^[  a-öA-Ö]+/", $_POST['input'])){
  
$input=$_POST['input'];
  
 
	$query = array();
	
		$sql = "SELECT movies.ID, title, genre, director, image, description
				FROM 
					movies 
				WHERE
				(title LIKE '%".$input."%' OR
				genre LIKE '%".$input."%' OR
				director LIKE '%".$input."%' OR
				image LIKE '%".$input."%' OR
				description LIKE '%".$input."%');
				"; 
		
		$STH = @$DBH->query($sql);
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($item = $STH->fetch()){
			$query[] = $item;
		}
		
	header("Content-Type: application/json; charset=utf-8", true);
	echo json_encode($query);
	
}
		
} catch(PDOException $e) {
		echo "Virhe";
		file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
	}
?>	