<?php
require_once('./includes/connect.php');

try {
	
	$id = $_POST['id'];
	
	$query = array();
	$movie = array();
	$reviews = array();
	
		$sql1 = "SELECT movies.ID, movies.title, movies.genre, movies.director, movies.release_year, movies.image, movies.description, SUM(grade) 'sum', AVG(grade) 'avg'
				FROM 
					movies
					LEFT JOIN reviews ON
						movies.ID = reviews.movie_id
				WHERE
				movies.ID = '".$id."';
				";
		
		$STH = @$DBH->query($sql1);
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($item = $STH->fetch()){
			$movie[] = $item;
		}
		
		$sql2 = "SELECT reviews.ID, reviews.movie_id, reviews.username, reviews.grade, reviews.date, reviews.review
				FROM 
					reviews
					LEFT JOIN movies ON
						movies.ID = reviews.movie_id
				WHERE
				movies.ID = '".$id."';
				";
		
		$STH = @$DBH->query($sql2);
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($review = $STH->fetch()){
			$reviews[] = $review;
		}
		
		$query[0] = $movie;
		$query[1] = $reviews;
		
	header("Content-Type: application/json; charset=utf-8", true);
	echo json_encode($query);
		
	} catch(PDOException $e) {
		echo "Error happened";
		file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
	}
?>