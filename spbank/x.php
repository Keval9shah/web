<?php 
require('connection.inc.php');

if(isset($_POST['d1']) && isset($_POST['d2'])){
    $d1=$_POST['d1'];
    $d2=$_POST['d2'];
}

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
    <link rel="stylesheet" href="x.css">
<?php
$acc_no=10080085;
$balance=$row['balance'];
if(isset($_POST['d1']) && isset($_POST['d2']) && $d2>$d1) {
$sql=" SELECT * FROM transaction WHERE acc_no=".$acc_no." AND datetime BETWEEN '".$d1."' and '".$d2."' ORDER BY datetime DESC ";
$result = mysqli_query($con,$sql); 
}
else{
$result = mysqli_query($con," SELECT * FROM transaction WHERE acc_no='$acc_no' ORDER BY datetime DESC ");
} 
 ?>
<div class='containerx1' style="margin-top:50px">
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
    <!-- SELECT * FROM table_name WHERE yourdate BETWEEN '2012-12-12' and '2013-12-12' -->
        <?php $ii=0; while($rows=$result->fetch_assoc()) { if($ii==0){ ?>
            <div class="frstwrap">
                <div class='dtind'>
                    <?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y');$GLOBALS['frstdate']=date_format(date_create($rows['datetime']),'Y-m-d'); ?>
                </div><div class="frto">
                <form action="" method="post">
                <input type="date" id="d1" name="d1"> to <input type="date" id="d2" name="d2">
                </form>
                
                </div>
            </div>
            <div class='backk'><?php
             } else if($cur_date!==date_format(date_create($rows['datetime']),'d/m/y')){
                ?>
                </div>
                <div class='dtind'>
                    <?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y'); $GLOBALS['lastdate']=date_format(date_create($rows['datetime']),'Y-m-d'); ?>
                </div>
                <div class='backk'><?php
            } $ii=1; ?>
            <li class='table-row'>
                <div class='col col-1'><?php echo date_format(date_create($rows['datetime']),'h:i A');?></div>
                <div class='col col-2'><?php echo $rows['s_name'];?></div>
                <?php $am = intval($rows['amount']); if($am>0){echo "<div class='col col-3 positive'>"; echo $am; echo "</div>";}else { echo "<div class='col col-3 negative'>"; echo $am; echo "</div>"; }  ?>
                <div class='col col-4'>₹<?php echo $rows['current_bal'];?></div>
            </li>
        <?php } ?>
    </ul>
<div>
    <script>
        var d1=document.querySelector("#d1");
        var d2=document.querySelector("#d2");
        var form=document.querySelector("form");
        d1.onchange = function (e){
            form.submit();
        }
        d2.onchange = function (e){
            form.submit();
        }
        <?php if(isset($_POST['d1']) && isset($_POST['d2']) && $d2>$d1){
            ?>
            d2.value="<?php echo $d2 ?>";
            d1.value="<?php echo $d1; ?>";
            <?php
        }
        else{
            ?>
            d2.value="<?php echo $GLOBALS['frstdate']; ?>";
            d1.value="<?php echo $GLOBALS['lastdate']; ?>";
            <?php
        }
        ?>

    </script>

