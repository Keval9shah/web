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
	$sql = "SELECT * FROM transaction where acc_no= $acc_no";
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
        table {
            margin: 0 auto;
            font-size: large;
            border: 1px ridge cyan;
        }
  
        h1 {
            text-align: center;
            color: #006600;
            font-size: xx-large;
            font-family: 'Gill Sans', 'Gill Sans MT', 
            ' Calibri', 'Trebuchet MS', 'sans-serif';
        }
  
        td {
            background-color: #E4F5D4;
            border: 1px solid black;
        }
  
        th,
        td {
            font-weight: bold;
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }
  
        td {
            font-weight: lighter;
        }
    </style>
</head>
  
<body>
    <section>
        <!-- TABLE CONSTRUCTION-->
        <table>
            <tr>
                <th>Pname</th>
                <th>Sname</th>
                <th>Amount</th>
                <th>AccountNo.</th>
				<th>Time</th>
            </tr>
            <!-- PHP CODE TO FETCH DATA FROM ROWS-->
            <?php   // LOOP TILL END OF DATA 
                while($rows=$result->fetch_assoc())
                {
             ?>
            <tr>
                <!--FETCHING DATA FROM EACH 
                    ROW OF EVERY COLUMN-->
                <td><?php echo $rows['p_name'];?></td>
                <td><?php echo $rows['s_name'];?></td>
                <td><?php echo $rows['amount'];?></td>
                <td><?php echo $rows['acc_no'];?></td>
				<td><?php echo $rows['datetime'];?></td>
            </tr>
            <?php
                }
             ?>
        </table>
    </section>
</body>
  
</html>