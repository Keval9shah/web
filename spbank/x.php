<?php
  
	// Username is root
	$user = 'root';
	$password = ''; 
	
	// Database name is gfg
	$database = 'spbank'; 
	// Server is localhost with
	// port number 3308
	$servername='localhost';
	$mysqli = new mysqli($servername, $user, 
					$password, $database);
	
	// Checking for connections
	if ($mysqli->connect_error) {
		die('Connect Error (' . 
		$mysqli->connect_errno . ') '. 
		$mysqli->connect_error);
	}
$acc_no=10080085;
	// SQL query to select data from database
	$sql = "SELECT * FROM transaction where acc_no= $acc_no ORDER BY datetime DESC";
	$result = $mysqli->query($sql);
	$mysqli->close(); 
?>
<!DOCTYPE html>
<html lang="en">
  
<head>
    <meta charset="UTF-8">

    <title>GFG User Details</title>
    <!-- CSS FOR STYLING THE PAGE -->
    <style>
        .positive{
            color:green;
            background:rgb(228, 255, 228);
        }
        .negative{
            color:red;
            background:rgb(255, 228, 228);
        }

        .negative,.positive{
            margin:0 4%;
        }
        .col{
            margin:0 0;
            padding:7px 3px;
            text-align:center;
        }
        .col-2{
            margin-right:7%;
        }
        .col-3{
            margin-right:5%;
            border-radius:5px;
        }

        body {
        font-family: "lato", sans-serif;
        }

        .container {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 10px;
        padding-right: 10px;
        }

        h2 {
        font-size: 26px;
        margin: 20px 0;
        text-align: center;
        }
        .responsive-table li {
        border-radius: 3px;
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        }
        .responsive-table .table-header {
        background-color: #95A5A6;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        }
        .responsive-table .table-row {
        background-color: #ffffff;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
        }
        .responsive-table .col-1 {
        flex-basis: 32%;
        }
        .responsive-table .col-2 {
        flex-basis: 26%;
        }
        .responsive-table .col-3 {
        flex-basis: 8%;
        }
        .responsive-table .col-4 {
        flex-basis: 19%;
        }
        @media all and (max-width: 767px) {
        .responsive-table .table-header {
            display: none;
        }
        .responsive-table li {
            display: block;
        }
        .responsive-table .col {
            flex-basis: 100%;
        }
        .responsive-table .col {
            display: flex;
            padding: 10px 0;
        }
        .responsive-table .col:before {
            color: #6C7A89;
            padding-right: 10px;
            content: attr(data-label);
            flex-basis: 50%;
            text-align: right;
        }
        }
        </style>
</head>
  
<body>
<div class="container">
            <h2>Transactions</h2>
            <ul class="responsive-table">
                <li class="table-header">
                <div class="col col-1">Date</div>
                <div class="col col-2">To/From</div>
                <div class="col col-3">Amount</div>
                <div class="col col-4">Balance</div> 
                </li>
                <?php   // LOOP TILL END OF DATA 
                while($rows=$result->fetch_assoc())
                {
                 ?>
            <li class="table-row">
                <!--FETCHING DATA FROM EACH 
                    ROW OF EVERY COLUMN-->
                <div class="col col-1"><?php echo date_format(date_create($rows['datetime']),"d/m/y  h:i A");?></div>
                <div class="col col-2"><?php echo $rows['s_name'];?></div>
                <?php $am = intval($rows['amount']); if($am>0){echo '<div class="col col-3 positive">'; echo $am; echo '</div>';} else{echo '<div class="col col-3 negative">'; echo $am; echo '</div>';}  ?>
                <div class="col col-4"><?php echo $rows['current_bal'];?></div>
                </li>
            <?php
                }
             ?>
            </ul>
            </div>
</body>
  
</html>