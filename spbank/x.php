<?php 
require('connection.inc.php');


session_start();
$acnt=$_SESSION['acc_no'];
$res = mysqli_query($con,"SELECT * FROM user WHERE acc_no='$acnt'");
$row = mysqli_fetch_assoc($res);
// echo $row['acc_no'],", ",$row['name'],", ",$row['balance'];
// echo ".";
$fullname=$row['name'];
if(strpos($fullname," ")){
    $name=substr($fullname, 0, strpos($fullname," "));
}
else{
    $name=$fullname;
}
?>
    <link rel="stylesheet" href="style1.css">
<?php
$acc_no=$row['acc_no'];
$balance=$row['balance'];
$result = mysqli_query($con," SELECT * FROM transaction WHERE acc_no= '$acc_no' ORDER BY datetime DESC ");
 ?>
<div class='containerx1'>
    <ul class='responsive-table ulx1'>
        <li class='table-header'>
            <div class='col c1h col-1'>Date</div>
            <div class='col col-2'>To/From</div>
            <div class='col col-3'>Amount</div>
            <div class='col col-4'>Balance</div> 
        </li>
    </ul>
<div class='containerx'>
    <ul class='responsive-table'>
        
        <?php $ii=0; while($rows=$result->fetch_assoc()) { if($ii==0){ ?>
            <div class='dtind'> 
                <?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y'); ?>
            </div><?php
             } else if($cur_date!==date_format(date_create($rows['datetime']),'d/m/y')){
                ?>
                <div class='dtind'> 
                    <?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y'); ?>
                </div><?php
            } $ii=1; ?>
            <li class='table-row'>
                <div class='col col-1'><?php echo date_format(date_create($rows['datetime']),'h:i A');?></div>
                <div class='col col-2'><?php echo $rows['s_name'];?></div>
                <?php $am = intval($rows['amount']); if($am>0){echo "<div class='col col-3 positive'>"; echo $am; echo "</div>";}else { echo "<div class='col col-3 negative'>"; echo $am; echo "</div>"; }  ?>
                <div class='col col-4'>₹<?php echo $rows['current_bal'];?></div>
            </li>
        <?php } ?>
    </ul>
</div>
