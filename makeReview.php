<?php
require_once('./includes/connect.php');

//if every single form field contains data, execute the following
if(!empty($_POST['username']) && !empty($_POST['rate-value']) && !empty($_POST['review-content'])){

				$date = date("Y-m-d h:i:sa");
				$username = utf8_encode($_POST['username']);
				$reviewContent = utf8_encode($_POST['review-content']);
				$grade = $_POST['rate-value'];
				$movieID = $_POST['movie_id'];
				
				$reviewData = array('movie_id' => $movieID,  'username' => $username, 'reviewContent' => $reviewContent, 'grade' => $grade, 'date' => $date); 
				
				try {
					
			$STH = $DBH->prepare("INSERT INTO reviews (movie_id, username, grade, review, date) values (:movie_id, :username, :grade, :reviewContent, :date)");
			$STH->execute($reviewData);
			
				$response = "Success";
				header("Content-Type: application/json; charset=utf-8", true);
				echo json_encode($response);
				
				} catch(PDOException $e) {
					
					echo "Error happened";
					file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
				}
					
				
//if every single field contains data except username, execute the following
}elseif(!($_POST['username']) && !empty($_POST['rate-value']) && !empty($_POST['review-content'])){
	
				$date = date("Y-m-d h:i:sa");
				$username = "Anonymous";
				$reviewContent = utf8_encode($_POST['review-content']);
				$grade = $_POST['rate-value'];
				$movieID = $_POST['movie_id'];
				
				$reviewData = array('movie_id' => $movieID,  'username' => $username, 'reviewContent' => $reviewContent, 'grade' => $grade, 'date' => $date); 
				
				try {
				
				$STH = $DBH->prepare("INSERT INTO reviews (movie_id, username, grade, review, date) values (:movie_id, :username, :grade, :reviewContent, :date)");
				$STH->execute($reviewData);
				$response = "Success";
				
				header("Content-Type: application/json; charset=utf-8", true);
				echo json_encode($response);
		
				} catch(PDOException $e) {
					echo "Error happened";
					file_put_contents('./log/PDOErrors.txt', $e->getMessage()."\n", FILE_APPEND);
				}

//if either review or grade is empty (or both), reply with a warning	
}else{
	$response = "Error";
	header("Content-Type: application/json; charset=utf-8", true);
	echo json_encode($response);
}


?>