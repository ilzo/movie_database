<?php
require_once('./includes/connect.php');
 ?>
 
 <!DOCTYPE html>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Frontpage</title>
<link rel="stylesheet" href="./assets/css/normalize.css">
<link rel="stylesheet" href="./assets/css/custom.css">
<script src="./assets/js/jquery.js"></script> 
<link rel="stylesheet" href="./assets/css/foundation.css">
<link rel="stylesheet" href="./assets/css/app.css">

<link rel="stylesheet" href="./rateyo/jquery.rateyo.min.css"/>


</head>

<body>
<!-- Header and Nav -->

<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text"><a href="index.php">Movie Database</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
  <form id="search">
    <ul class="menu">
      <li><input type="search" id="search-input" name="search-input" placeholder="Search"></li>
      <li><button type="button" id="search-submit" name="search-submit" class="button">Search</button></li>
    </ul>
	</form>
  </div>
</div>

<!-- End Header and Nav --> 

<!-- Content Area -->
	 <div id="content" class="row">
		 <div class="panel-container large-12 columns">
		 </div>
     </div>
<!-- End Content Area -->

<!-- Footer -->

<footer class="row">
  <div class="large-12 columns">
    <hr />
    <div class="row">
      <div class="large-12 columns">
        <p>&copy; Database driven website made by Ilzo</p>
      </div>
    </div>
  </div>
</footer>

<script type="text/javascript" src="./assets/js/what-input.js"></script>
<script type="text/javascript" src="./assets/js/foundation.js"></script>
<script type="text/javascript" src="./assets/js/app.js"></script>
<script type="text/javascript" src="./rateyo/jquery.min.js"></script>
<script type="text/javascript" src="./rateyo/jquery.rateyo.min.js"></script>
<script type="text/javascript" src="./js/main.js" ></script>
</body>
</html>