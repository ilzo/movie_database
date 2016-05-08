var content = $('#content');
var panelContainer = $('.panel-container');
var row = $('<div class="row"></div>');
var largeColumn = $('<div class="large-12 columns"></div>');
var movieID;

$('#search-submit').on('click', function() {
  $('#search').submit();
});

$.getJSON('getMoviePanels.php', function(articles){
	console.log(articles);
	
	$.each(articles, function(i, item){
		if(i < articles.length)
		
			var panel = $('<div id="Panel-'+item.ID+'" class="movie-panel large-3 medium-3 columns primary callout" data-equalizer-watch></div>');
			var title = $('<h5>'+item.title+'</h5>');
			var genre = $('<p>'+item.genre+'<p/>');
			var img = $('<img class="panel-image" src="./assets/img/'+item.image+'">');
			
		panel.append(title);
		panel.append(genre);
		panel.append(img);
		
		panelContainer.append(panel);
		
		$( "#Panel-"+item.ID).click(function() {
		  getMovieData(item.ID);
		  
		});
		
});

$('div.panel-container > div').each(function(i) {
    if( i % 3 == 0 ) {
        $(this).nextAll().andSelf().slice(0,3).wrapAll('<div class="row panel-row" data-equalizer></div>');
    }
});

$( ".panel-row div:last-child" ).addClass( "end" );

window.history.pushState("main", "Main panel", "/movie_database/index.php");

});

function getMovieData (id) {
	
	$('.single-container').empty();
	$('.single-container').remove();		
	$('.user-review-container').empty();
	$('.user-review-container').remove();
	$('.single').empty();
	$('.single').remove();
	var singleContainer = $('<div class="single-container large-8"></div>');
	var movieArticle = $('<div class="single primary callout left"></div>');
	
			$.ajax({
			  url: "getMovieSingle.php",
			  type: "POST",
			  dataType: "json",
			  data: {'id' : id},
			  success: function(resp) {
				  
				  panelContainer.hide();
				  content.append(singleContainer);
				  singleContainer.append(movieArticle);
				  
				  var movie = resp[0][0];
				  var reviews = resp[1];
				  
				  var singleTitle = $('<h3>'+movie.title+'</h3>');
				  var singleGenre = $('<b>'+movie.genre+'<b/><br />');
				  var singleDirector = $('<i>Directed by: '+movie.director+'<i/><br />');
				  var singleReleased = $('<i>Released: '+movie.release_year+'<i/><br />');
				  var singleDesc = $('<p>'+movie.description+'<p/>');
				  var singleImg = $('<img src="./assets/img/'+movie.image+'">');
				  var averageGrade = $('<div id="rateyo-average-grade"></div><hr>');
				  
				  movieArticle.append(singleTitle);
				  movieArticle.append(singleGenre);
				  movieArticle.append(singleDirector);
				  movieArticle.append(singleReleased);
				  movieArticle.append(averageGrade);
				  movieArticle.append(singleDesc);
				  movieArticle.append(singleImg);
				  
				  if(movie.avg !== null) {
					  $(function () {
						  $("#rateyo-average-grade").rateYo({
							rating: movie.avg,
							readOnly: true
						  });
						});
				  }else{
					  $(function () {
						  $("#rateyo-average-grade").rateYo({
							rating: 0,
							readOnly: true
						  });
						});
				  }
					
				  if(reviews.length !== 0) {
					  $.each(reviews, function(i, review){
						  if(i < reviews.length)
							var reviewContainer = $('<div class="review-container secondary callout left"></div>'); 
							var reviewUsername = $('<a id="user-link-'+review.ID+'">'+review.username+'</a><br />');
							var reviewTime = $('<i>Posted on: '+review.date+'<i/><br />');
							var reviewGrade = $('<div id="rateyo-review-grade-'+review.ID+'" class="rateyo-review-grade"></div><hr>');
							var reviewMessage = $('<p>'+review.review+'<p/>');
							
							reviewContainer.append(reviewUsername);
							reviewContainer.append(reviewTime);
							reviewContainer.append(reviewGrade);
							reviewContainer.append(reviewMessage);
							singleContainer.append(reviewContainer);
							
								$(function () {
								  $("#rateyo-review-grade-"+review.ID).rateYo({
									rating: review.grade,
									starWidth: "20px",
									readOnly: true
								  });
								});
								
								$('#user-link-'+review.ID).click(function(){
									var linkVal = $(this).html();
									getUserReviews(linkVal); 
									return false; 
								});
						
					  });
				  }
				  var serverResponseContainer = $('<div class="server-response-container large-12"></div>');
				  
				  var reviewForm = $('<form id="review-form">' +
										'<fieldset id="form-fieldset">' +
											'<legend>Review form</legend>' +
												'<div class="row">' +
												'<div class="large-8 columns">' +
												  '<label>User name<input type="text" id="username" name="username" placeholder="Username" />' +
												  '</label>' +
												'</div>' +
												'</div>' +
												'<div class="row">' +
													'<div class="large-8 columns">' +
													  '<label>Grade</label>' +
														'<div id="rateyo-editable"></div>' +
														'<input type="hidden" id="rate-value" name="rate-value" value="0">' +
													'</div>' +
												'</div>' +
												'<div class="row">' +
												  '<div class="large-8 columns">' +
													'<label>Message</label>' +
													'<textarea name="review-content" id="review-content" placeholder="Say something about the movie"></textarea>' +
												  '</div>' +
												'</div>' + 
											'<button type="button" class="button submit-button">Send</button>' +	
										'</form>' +
								'</fieldset>');
								
					singleContainer.append(serverResponseContainer);				
					singleContainer.append(reviewForm);
					
					$('.submit-button').on('click', sendMovieReview);
					
					
					$("#rateyo-editable").rateYo({
						rating: 0,
						halfStar: true,
						onSet: function (rating, rateYoInstance) {
						  $('#rate-value').val(rating);
						}
					  });
					  
					window.history.pushState("single", "Article", "/movie_database/index.php?id="+id+"");
					movieID = id;
					
					window.onpopstate = function(e){
						if(e.state){
							panelContainer.show();
							movieArticle.empty();
							movieArticle.remove();
							$('.review-container').empty();
							$('.review-container').remove();
							$('.single-container').empty();
							$('.single-container').remove();
						}
					};
					
				}
			}).error (function( jqXHR, textStatus, errorThrown ) {
				console.log( "Request failed: " + textStatus + errorThrown );
				console.log(arguments);
			});
			
		}
		
function sendMovieReview(){
	
	var reviewForm = $('.submit-button').closest("form");
	var reviewData = reviewForm.serializeArray();
	reviewData.push({name: 'movie_id', value: movieID});
	
	// Fire off the request to makeReview.php
    $.ajax({
        url: 'makeReview.php',
        type: 'post',
        data: reviewData,
		datatype: 'json',
		success: function(resp) {
			
			if (resp === "Success") {
				var responseMessage = $('<div class="response-message-success success callout left">Review posted succesfully</div>');
				$('.server-response-container').append(responseMessage);
				$('.server-response-container').css('margin-top', '-=5em');
				$('.server-response-container').css('margin-bottom', '-=5em');
			}else if (resp === "Error"){
				var responseMessage = $('<div class="response-message-alert alert callout left">Review must contain at least both grade and content message!</div>');
				$('.server-response-container').append(responseMessage);
				$('.server-response-container').css('margin-top', '-=5em');
				$('.server-response-container').css('margin-bottom', '-=5em');
			}
		
		}
	}).error(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

}


$('#search').submit(function(event){
	
	event.preventDefault();
	var input = $('#search-input').val();

	// Fire off the request to searchMovie.php
    $.ajax({
        url: 'searchMovie.php',
        type: 'post',
        data: {'input' : input},
		datatype: 'json',
		success: function(resp) {
			panelContainer.empty();
			if ( $('.single').length ) {
				$('.single').empty();
				$('.single').remove();
			}
			
			$('.review-container').empty();
			$('.review-container').remove();
			$('.single-container').empty();
			$('.single-container').remove();
			panelContainer.show();
			
			if(resp.length == 0){
				var panel = $('<div class="response-message-alert alert callout">Movie not found</div>');
				panelContainer.append(panel);
			}else{
				$.each(resp, function(i, item){
			
					if(i < resp.length)
						
						var panel = $('<div id="Panel-'+item.ID+'" class="movie-panel large-3 medium-3 columns primary callout" data-equalizer-watch></div>');
						
						var title = $('<h5>'+item.title+'</h5>');
						var genre = $('<p>'+item.genre+'<p/>');
						var img = $('<img class="panel-image" src="./assets/img/'+item.image+'">');
						
						panel.append(title);
						panel.append(genre);
						panel.append(img);
						panelContainer.append(panel);
						
						$( "#Panel-"+item.ID).click(function() {
						  getMovieData(item.ID);
						  
						});
				});
				
				$('div.panel-container > div').each(function(i) {
					if( i % 3 == 0 ) {
						$(this).nextAll().andSelf().slice(0,3).wrapAll('<div class="row panel-row" data-equalizer></div>');
					}
				});
				$( ".panel-row div:last-child" ).addClass( "end" );
			}
		}
	}).error(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
});


function getUserReviews(val) {
	// Fire off the request to getUserReviews.php
	$.ajax({
        url: 'getUserReviews.php',
        type: 'post',
        data: {'username' : val},
		datatype: 'json',
		success: function(resp) {
			$('.single-container').hide();
			var userReviewContainer = $('<div class="user-review-container large-8"></div>');
			var pageTitle = $('<h3>Reviews posted by '+val+'</h3>');
			content.append(userReviewContainer);
			userReviewContainer.append(pageTitle);
			
			$.each(resp, function(i, item){
			
					if(i < resp.length)

							var reviewContainer = $('<div class="review-container secondary callout left"></div>'); 
							var reviewUsername = $('<b>'+item.username+'</b><br />');
							var reviewPostedOn = $('<b>Posted on: </b><a id="movie-link-'+item.movie_id+'">'+item.title+'</a><br />');
							var reviewGrade = $('<div id="rateyo-user-review-grade-'+item.reviewID+'" class="rateyo-review-grade"></div><hr>');
							var reviewMessage = $('<p>'+item.review+'<p/>');
							
							reviewContainer.append(reviewUsername);
							reviewContainer.append(reviewPostedOn);
							reviewContainer.append(reviewGrade);
							reviewContainer.append(reviewMessage);
							$('.user-review-container').append(reviewContainer);
							
								$(function () {
								  $('#rateyo-user-review-grade-'+item.reviewID).rateYo({
									rating: item.grade,
									starWidth: "20px",
									readOnly: true
								  });
								});
								
								$( '#movie-link-'+item.movie_id).click(function() {
								  getMovieData(item.movie_id);
								});
							
				});
				
				window.onpopstate = function(e){
						if(e.state){
							$('.single-container').show();
							$('.user-review-container').empty();
							$('.user-review-container').remove();
							window.history.pushState("single", "Article", "/movie_database/index.php?id="+movieID+"");
						}
					};
		}
	}).error(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
}