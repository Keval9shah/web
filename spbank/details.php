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
$acc_no=$row['acc_no'];
$balance=$row['balance'];
// $name="abababaxxx shcdxcda";


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

            exm.innerHTML="<div class='profile'><div class='hi'>Hi,<?php echo ' ',$name; ?></div><div class='acc_no'><mark class='accn'><?php echo $acc_no; ?></mark></div><br><div class='bal'>Balance <mark class='bala'>₹<?php echo mysqli_fetch_assoc(mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acc_no'"))['balance'];?></mark</div></div>";
            document.body.style.backgroundColor="beige";
        }
        function trct() {
            pf.classList.remove("sel1");
            th.classList.remove("sel1");
            ul.classList.remove("sel1");
            tr.classList.add("sel1");
            
            sel.style.left = tr.offsetLeft+"px";
            sel.style.width=tr.offsetWidth+"px";

            exm.innerHTML="<div class='receipt'><div class='receipt-list'><div class='fields'><form action='trandata.php' method='POST'><div class='receiver fl'><div class='field'>Email/Account no.</div><div class='answer'><input id='rec' minlength='3' maxlength='30' name='receiver' required placeholder='Ex@xyz.com or 10080085'></div></div><div class='flx'><div class='amount fl'><div class='field'>Amount</div><div class='answer'><input id='ana' maxlength='10' static='' name='amount' required placeholder='Enter Amount'></div></div><div class='go fl'><button onclick='' name='submit' type='submit' class='pay'>Pay <svg width='16px' height='15px' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg></button></div></div></form></div></div></div>";
            document.body.style.backgroundColor="#eee";

        }
        function trht() {
            tr.classList.remove("sel1");
            pf.classList.remove("sel1");
            ul.classList.remove("sel1");
            th.classList.add("sel1");
            
            sel.style.left =th.offsetLeft+"px";
            sel.style.width=th.offsetWidth+"px";

            exm.innerHTML="<div class='trhistory'><section><table><tr><th>Pname</th><th>Sname</th><th>Amount</th><th>AccountNo.</th><th>Time</th></tr><!-- PHP CODE TO FETCH DATA FROM ROWS--><?php $sql = "SELECT * FROM transaction where acc_no= $acc_no"; $result = $con->query($sql);?> <?php while($rows=$result->fetch_assoc()){?><tr><!--FETCHING DATA FROM EACH ROW OF EVERY COLUMN--><td><?php echo $rows['p_name']; ?></td><td><?php echo $rows['s_name']; ?></td><td><?php echo $rows['amount']; ?></td><td><?php echo $rows['acc_no']; ?></td><td><?php echo $rows['datetime']; ?></td></tr><?php } ?></table></section></div>";

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