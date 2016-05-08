<?php
require_once('./includes/connect.php');

try {
	$articles = array();
	
		$sql = "SELECT movies.ID, movies.title, movies.genre, movies.image
				FROM 
					movies;
				"; 
		
		$STH = @$DBH->query($sql);
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($article = $STH->fetch()){
			$articles[] = $article;
		}
		
	echo json_encode($articles);
		
	} catch(PDOException $e) {
		echo "Error happened";
		file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
	}
?>		