<?php
require('connection.inc.php');

session_start();
$acnt=$_SESSION['acc_no'];
$acc_no=$acnt;
$res = mysqli_query($con,"SELECT name FROM user WHERE acc_no='$acnt'");
$row = mysqli_fetch_assoc($res);
// echo $row['acc_no'],", ",$row['name'],", ",$row['balance'];
// echo ".";
$fullname=$row['name'];
if(isset($_POST['submit'])){
    $receiver=$_POST['receiver'];
    $amount=$_POST['amount'];
    $res1 = mysqli_query($con,"SELECT * FROM user WHERE acc_no='$acnt'");
    $row1 = mysqli_fetch_assoc($res1);
    if(strpos($receiver,"@")){
        $r_email=strtolower($receiver);
        $res2 = mysqli_query($con,"SELECT * FROM user WHERE email='$r_email'");
        $row2 = mysqli_fetch_assoc($res2);
        if($row2){
            $r_acc_no=$row2['acc_no'];
        }
    }
    else{
        $r_acc_no=$receiver;
        $res2 = mysqli_query($con,"SELECT * FROM user WHERE acc_no='$r_acc_no'");
        $row2 = mysqli_fetch_assoc($res2);
    }
    if(mysqli_num_rows($res2)>0 && is_numeric($amount)){
        $s_bal=$row1['balance'];
        $r_bal=$row2['balance'];
        $s_newbal=$s_bal-$amount;
        $r_newbal=$r_bal+$amount;
        $s_name=$fullname;
        $r_name=$row2['name'];
        $namount=-$amount;

        if(intval($amount)>0 && intval($amount)<intval($s_bal)){
            if($acc_no!=$r_acc_no){
                mysqli_query($con,"UPDATE user SET balance='$r_newbal' WHERE acc_no='$r_acc_no'");
                mysqli_query($con,"UPDATE user SET balance='$s_newbal' WHERE acc_no='$acc_no'");
                mysqli_query($con,"INSERT INTO transaction (p_name,s_name,acc_no,amount,current_bal) VALUES ('$s_name','$r_name','$acc_no','$namount' ,'$s_newbal')");
                mysqli_query($con,"INSERT INTO transaction (p_name,s_name,acc_no,amount,current_bal) VALUES ('$r_name','$s_name','$r_acc_no','$amount','$r_newbal')");
                ?>
                <script>
                alert('Transaction successful');
                alert(<?php echo $receiver.$r_email ?>);
                window.location.href = 'details.php?tr=done';
                </script>
            <?php
            }
            else{
                ?>
        <script>
                alert('It\'s your own account');
        window.location.href = 'details.php?tr=done';
        </script>
    <?php
            }
        }
        else{
            ?>
        <script>
            alert('Amount is negative or greater than your balance');
        window.location.href = 'details.php?tr=done';
        </script>
    <?php
        }

        
    }
    else{ ?>
        <script>
        alert('no such person exists or amount is wrong');
        window.location.href = 'details.php?tr=done';
        </script>
    <?php }
    //p_name
    //s_name
    //acc_no
    //amount
    //current_bal
    //datetime
}
?> 