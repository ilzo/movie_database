<?php
require_once('./includes/connect.php');

try {
	$username = $_POST['username'];
	$reviews = array();
	
		$sql = "SELECT reviews.ID 'reviewID', movies.title, movie_id, username, grade, date, review
				FROM 
					reviews
					LEFT JOIN movies ON
						movies.ID = reviews.movie_id
				WHERE
				username = '".$username."';
				";
		
		$STH = @$DBH->query($sql);
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($review = $STH->fetch()){
			$reviews[] = $review;
		}
			
	header("Content-Type: application/json; charset=utf-8", true);
	echo json_encode($reviews);
		
	} catch(PDOException $e) {
		echo "Error happened";
		file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
	}
?>