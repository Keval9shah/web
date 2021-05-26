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
$acc_no=$row['acc_no'];
$balance=$row['balance'];
// $name="abababaxxx shcdxcda";


if(isset($_POST['submit'])){
    $receiver=$_POST['receiver'];
    $amount=$_POST['amount'];
    $res1 = mysqli_query($con,"SELECT * FROM user WHERE acc_no='$acnt'");
    $row1 = mysqli_fetch_assoc($res1);
    if(strpos($receiver,"@")){
        $r_email=$receiver;
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

    if(mysqli_num_rows($res2)>0){
        $s_bal=$row1['balance'];
        $r_bal=$row2['balance'];
        $s_newbal=$s_bal-$amount;
        $r_newbal=$r_bal+$amount;
        $s_name=$fullname;
        $r_name=$row2['name'];
        $namount=-$amount;

        if($acc_no!=$r_acc_no){
            mysqli_query($con,"UPDATE user SET balance='$r_newbal' WHERE acc_no='$r_acc_no'");
            mysqli_query($con,"UPDATE user SET balance='$s_newbal' WHERE acc_no='$acc_no'");
            mysqli_query($con,"INSERT INTO transaction (p_name,s_name,acc_no,amount,current_bal) VALUES ('$s_name','$r_name','$acc_no','$namount' ,'$s_newbal')");
            mysqli_query($con,"INSERT INTO transaction (p_name,s_name,acc_no,amount,current_bal) VALUES ('$r_name','$s_name','$r_acc_no','$amount','$r_newbal')");
            echo "<script>alert('Transaction successful');</script>";
        }
        else{
            echo "<script>alert('it is your own account');</script>";
        }
    }
    else{
        echo "<script>alert('no such email or account exists');</script>";
    }
    //p_name
    //s_name
    //acc_no
    //amount
    //current_bal
    //datetime
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style1.css">
    <link rel="stylesheet" href="st.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/clementfive" type="text/css"/>

</head>
<body>
    <div class="navigation">
        <div class="pf sel1 partition" onclick="prfl()">
        <?php echo $name; ?>'s profile
        </div>
        <div class="tr partition" onclick="trct()">
            Send Money
        </div>
        <div class="th partition" onclick="trht()">
            Transactions
        </div>
        <div class="ul" onclick="usli()">
            User's List
        </div>
    </div>
    <div class="sel"></div>
    <div class="extra_maal">
        <div class="profile">
            <div class="hi">Hi,<?php echo " ",$name; ?></div>
            <div class="acc_no">
                <mark class="accn"><?php echo $acc_no; ?></mark>
            </div>
            <br>
            <div class="bal">Balance <mark class="bala">₹<?php echo mysqli_fetch_assoc(mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acnt'"))['balance']; ?></mark></div>
        </div>
    </div>
    <script>
        var pf = document.getElementsByClassName("pf")[0];
        var tr = document.getElementsByClassName("tr")[0];
        var th = document.getElementsByClassName("th")[0];
        var ul = document.getElementsByClassName("ul")[0];
        var sel = document.getElementsByClassName("sel")[0];
        var nav = document.getElementsByClassName("navigation")[0];
        var exm = document.getElementsByClassName("extra_maal")[0];

        window.addEventListener('resize', () => {
            prfl();
        });

        var balance=<?php echo $row['balance'];?>;
        var acc_no=<?php echo $row['acc_no'];?>;
        // var acc_string=acc_no.toString();
        // var imgs=["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];

        // function addAccImages(){
        // var images="";
        //     for(i=0;i<8;i++){
        //         images+="<img class='accimg' src='"+imgs[acc_string[i]]+"'>";
        //     }
        //     document.getElementsByClassName("acc_no")[0].innerHTML=images;
        // }
        // addAccImages();



        var wdth=pf.offsetWidth+tr.offsetWidth+th.offsetWidth+ul.offsetWidth+34;

        nav.style.width=wdth+"px";

        prfl();
        // usli();
        function prfl() {
            tr.classList.remove("sel1");
            th.classList.remove("sel1");
            ul.classList.remove("sel1");
            pf.classList.add("sel1");
            
            sel.style.left = pf.offsetLeft+"px";
            sel.style.width=pf.offsetWidth+"px";

            exm.innerHTML="<div class='profile'><div class='hi'>Hi,<?php echo ' ',$name; ?></div><div class='acc_no'><mark class='accn'><?php echo $acc_no; ?></mark></div><br><div class='bal'>Balance <mark class='bala'>₹<?php $balres=mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acc_no'"); $bal=mysqli_fetch_assoc($balres); echo $bal['balance']; ?></mark</div></div>";
            document.body.style.backgroundColor="beige";
        }
        function trct() {
            pf.classList.remove("sel1");
            th.classList.remove("sel1");
            ul.classList.remove("sel1");
            tr.classList.add("sel1");
            
            sel.style.left = tr.offsetLeft+"px";
            sel.style.width=tr.offsetWidth+"px";

            exm.innerHTML="<div class='receipt'><div class='receipt-list'><div class='fields'><form action='' method='POST'><div class='receiver fl'><div class='field'>Email/Account no.</div><div class='answer'><input id='rec' minlength='3' maxlength='30' name='receiver' required placeholder='Ex@xyz.com or 10080085'></div></div><div class='flx'><div class='amount fl'><div class='field'>Amount</div><div class='answer'><input id='ana' maxlength='10' static='' name='amount' required placeholder='Enter Amount'></div></div><div class='go fl'><button onclick='' name='submit' type='submit' class='pay'>Pay <svg width='16px' height='15px' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg></button></div></div></form></div></div></div>";
            document.body.style.backgroundColor="#eee";

            document.getElementsByTagName("form")[0].onsubmit((event)=> { event.preventDefault(); } );
        }
        function trht() {
            tr.classList.remove("sel1");
            pf.classList.remove("sel1");
            ul.classList.remove("sel1");
            th.classList.add("sel1");
            
            sel.style.left =th.offsetLeft+"px";
            sel.style.width=th.offsetWidth+"px";

            // exm.innerHTML="<div class='trhistory'><?php
            // $res3 = mysqli_query($con,"SELECT * FROM transaction WHERE acc_no='$acnt'");
            // $row3 = mysqli_fetch_assoc($res3);
            // for ($i=0; $i <5 ; $i++) { 
            //     echo "hii";
            // }
            // ?></div>";

        }
        function usli() {
            tr.classList.remove("sel1");
            th.classList.remove("sel1");
            pf.classList.remove("sel1");
            ul.classList.add("sel1");
            
            var wth=ul.offsetWidth+4;
            sel.style.left = ul.offsetLeft+"px";
            sel.style.width=wth+"px";

            exm.innerHTML="<div class='user_list'></div>";

        }
        const accn = document.getElementsByClassName("accn")[0];

        accn.onclick = function() {
        document.execCommand("copy");
        }
        accn.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", accn.textContent);
            // console.log(event.clipboardData.getData("text"))
            alert("Account no copied to clipBoard");
            accn.style.cursor="text";
        }
        else{
            alert("not copied");
        }
        });
    </script>
</body>
</html>