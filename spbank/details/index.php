<?php
require('../connection.inc.php');

if(isset($_POST['d1']) && isset($_POST['d2'])){
    $d1=$_POST['d1'];
    $d2=$_POST['d2'];
}

session_start();
if(!$_SESSION['acc_no']){
    echo '<script type="text/JavaScript">
    window.location.href = "redirect.html";
    </script>';
}
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
$email=$row['email'];
// $name="abababaxxx shcdxcda";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <link rel="icon" type="image/png" href="../favicon.png" />
    <title><?php echo $fullname ?></title>
    <link rel="stylesheet" href="../style1.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/clementfive" type="text/css"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div class="logout">
        <!-- <img src="s.png" alt=""> -->
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
        Log Out
    </div>
    <div class="navigation">
        <div class="pf sel1" onclick="prfl()">
        <?php echo $name; ?>'s profile
        </div>
        <div class="partition pfp"></div>
        <div class="tr" onclick="trct()">
            Send Money
        </div>
        <div class="partition trp"></div>
        <div class="th" onclick="trht()">
            Transactions
        </div>
        <div class="partition thp"></div>
        <div class="ul" onclick="usli()">
            User's List
        </div>
    </div>
    <div class="sel"></div>

    <a href="https://twitter.com/keval2001" target="_blank" class="twitter social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
        <span class="social-button__inner">
           <i class="fa fa-twitter tw"></i>
          </span>
    </a>
    <a href="https://www.linkedin.com/in/keval-shah-a4b2811a3/" target="_blank" class="linkedin social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
        <span class="social-button__inner">
           <i class="fa fa-linkedin"></i>
          </span>
    </a>
    <a href="https://github.com/Keval9shah" target="_blank" class="github social-buttons__button social-button social-button--codepen" aria-label="CodePen">
        <span class="social-button__inner">
            <i class="fa fa-github gb"></i>
          </span>
    </a>
    <a href="https://www.instagram.com/kvl.sh/" target="_blank" class="instagram social-buttons__button social-button social-button--github" aria-label="GitHub">
        <span class="social-button__inner">
                <i class="fa fa-instagram in"></i>
          </span>
    </a>
    
    <div class="extra_maal">
        <div class="profile">
            <div class="hi">Hi,<?php echo " ",$name; ?></div>
            <div class='em'><?php echo $email; ?></div>
            <div class="acc_no">
                <mark class="accn"><?php echo $acc_no; ?></mark>
            </div>
            <br>
            <div class="bal">Balance <mark class="bala">₹<?php echo mysqli_fetch_assoc(mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acnt'"))['balance']; ?></mark></div>
        </div>
    </div>
    
    <img src="greenary.png" class="greenary">
    <img src="greenary2.png" class="greenary2">
<script>
        var pf = document.querySelector(".pf");
        var tr = document.querySelector(".tr");
        var th = document.querySelector(".th");
        var ul = document.querySelector(".ul");
        var sel = document.querySelector(".sel");
        var nav = document.querySelector(".navigation");
        // var links = document.querySelector(".links");
        var exm = document.querySelector(".extra_maal");
        var pfp=document.querySelector(".pfp");
        var trp=document.querySelector(".trp");
        var thp=document.querySelector(".thp");
        

        window.addEventListener('resize', () => {
            prfl();
        });

        document.querySelector(".logout").onclick=()=>{
            <?php
                session_destroy();
            ?>
            location.href="../";
        }

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

        var wdth;
        function navwidth(){
            wdth=pf.offsetWidth+tr.offsetWidth+th.offsetWidth+ul.offsetWidth+38;
            nav.style.width=wdth+"px";
            // wdth2=nav.style.marginLeft+wdth;
            // wdth2=parseInt(window.getComputedStyle(nav).marginLeft.substring(0, window.getComputedStyle(nav).marginLeft.length-2))+wdth-5;
            // console.log(wdth2);
            // links.style.left=wdth2+"px";
        }
        
        navwidth();

        
        function prfl() {
            tr.classList.remove("sel1");
            th.classList.remove("sel1");
            ul.classList.remove("sel1");
            pf.classList.add("sel1");
            
            sel.style.left = pf.offsetLeft+"px";
            sel.style.width=pf.offsetWidth+"px";

            pfp.style.visibility="hidden";
            trp.style.visibility="visible";
            thp.style.visibility="visible";

            exm.innerHTML="<div class='profile'><div class='hi'>Hi,<?php echo ' ',$name; ?></div><div class='em'><?php echo $email; ?></div><div class='acc_no'><mark class='accn'><?php echo $acc_no; ?></mark></div><br><div class='bal'>Balance <mark class='bala'>₹<?php $balance=mysqli_fetch_assoc(mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acc_no'"))['balance']; echo $balance; ?></mark</div></div>";

            
            // const accn = document.getElementsByClassName("accn")[0];
            // accn.onclick = function() {document.execCommand("copy");}
            //     accn.addEventListener("copy", function(event) {
            //     event.preventDefault();
            //     if (event.clipboardData) {
            //         event.clipboardData.setData("text/plain", accn.textContent);
            //         // console.log(event.clipboardData.getData("text"))
            //         alert("Account no copied to clipBoard");
            //         accn.style.cursor="text";
            //     }
            //     else{
            //         alert("not copied");
            //     }
            //     });
        }
        function trct() {
            pf.classList.remove("sel1");
            th.classList.remove("sel1");
            ul.classList.remove("sel1");
            tr.classList.add("sel1");
            
            sel.style.left = tr.offsetLeft+"px";
            sel.style.width=tr.offsetWidth+"px";

            pfp.style.visibility="hidden";
            trp.style.visibility="hidden";
            thp.style.visibility="visible";

            exm.innerHTML="<div class='receipt'><div class='receipt-list'><div class='fields'><div class='flbal'>your balance <br><div class='flbal1'>₹<span><?php $balance=mysqli_fetch_assoc(mysqli_query($con,"SELECT balance FROM user WHERE acc_no='$acc_no'"))['balance']; echo $balance; ?></span></div></div><form action='trandata.php' method='POST'><div class='receiver fl'><div class='field'>Email/Account no.</div><div class='answer'><input id='rec' minlength='3' maxlength='30' name='receiver' required placeholder='Ex@xyz.com or 10080085'></div></div><div class='fl'><div class='amount fl'><div class='field'>Amount</div><div class='answer'><input id='ana' maxlength='10' static='' name='amount' required placeholder='Enter Amount'></div></div><div class='go fl'><button onclick='' name='submit' type='submit' class='pay'>Pay <svg width='16px' height='15px' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg></button></div></div></form></div></div></div>";

            // var rname=document.getElementById("rec");
            // var pay=document.getElementsByClassName("pay")[0];
            // rname.onfocusout=function(){
            //     if(rname.value.length>5){
                   
            //     }
            // }
        }
        function trht() {
            tr.classList.remove("sel1");
            pf.classList.remove("sel1");
            ul.classList.remove("sel1");
            th.classList.add("sel1");

            pfp.style.visibility="visible";
            trp.style.visibility="hidden";
            thp.style.visibility="hidden";

            sel.style.left =th.offsetLeft+"px";
            sel.style.width=th.offsetWidth+"px";

            exm.innerHTML="<?php if(isset($_POST['d1']) && isset($_POST['d2']) && $d2>$d1) { $sql=" SELECT * FROM transaction WHERE acc_no=".$acc_no." AND datetime BETWEEN '".$d1."' and '".$d2." 23:59:59"."' ORDER BY datetime DESC "; $result = mysqli_query($con,$sql); } else{ $result = mysqli_query($con," SELECT * FROM transaction WHERE acc_no='$acc_no' ORDER BY datetime DESC "); } ?><div class='containerx1'><ul class='responsive-table ulx1'><li class='table-header'><div class='col c1h col-1'>Date</div><div class='col col-2'>To/From</div><div class='col col-3'>Amount</div><div class='col col-4'>Balance</div> </li></ul><div class='containerx'><ul class='responsive-table'><?php $ii=0; while($rows=$result->fetch_assoc()) { if($ii==0){ ?><div class='frstwrap'><div class='dtind'><?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y');$GLOBALS['frstdate']=date_format(date_create($rows['datetime']),'Y-m-d'); ?></div><div class='frto'><form action='?tr=done' method='POST'><input type='date' id='d1' name='d1'> to <input type='date' id='d2' name='d2'></form></div></div><div class='backk'><?php } else if($cur_date!==date_format(date_create($rows['datetime']),'d/m/y')){ ?></div><div class='dtind'><?php echo date_format(date_create($rows['datetime']),'d/m/y'); $cur_date=date_format(date_create($rows['datetime']),'d/m/y'); $GLOBALS['lastdate']=date_format(date_create($rows['datetime']),'Y-m-d'); ?></div><div class='backk'><?php } $ii=1; ?><li class='table-row'><div class='col col-1'><?php echo date_format(date_create($rows['datetime']),'h:i A');?></div><div class='col col-2'><?php echo $rows['s_name'];?></div><?php $am = intval($rows['amount']); if($am>0){echo "<div class='col col-3 positive'>"; echo $am; echo '</div>';}else { echo "<div class='col col-3 negative'>"; echo $am; echo '</div>'; }  ?><div class='col col-4'>₹<?php echo $rows['current_bal'];?></div></li><?php } ?></ul></div>";
            var d1=document.querySelector('#d1'); 
            var d2=document.querySelector('#d2'); 
            var form=document.querySelector('form'); 
            d1.onchange = function (){ form.submit(); } 
            d2.onchange = function (){ form.submit(); } 
            <?php if(isset($_POST['d1']) && isset($_POST['d2']) && $d2>$d1){ ?> 
            d2.value='<?php echo $d2 ?>'; 
            d1.value='<?php echo $d1; ?>';<?php } 
            else{ ?> d2.value='<?php echo $GLOBALS['frstdate']; ?>'; 
            d1.value='<?php echo $GLOBALS['lastdate']; ?>';<?php } ?>
        }
        function usli() {
            tr.classList.remove("sel1");
            th.classList.remove("sel1");
            pf.classList.remove("sel1");
            ul.classList.add("sel1");

            pfp.style.visibility="visible";
            trp.style.visibility="visible";
            thp.style.visibility="hidden";
            
            var wth=ul.offsetWidth+3;
            sel.style.left = ul.offsetLeft+"px";
            sel.style.width=wth+"px";

            exm.innerHTML="<?php $result = mysqli_query($con," SELECT id,name,email,acc_no FROM user"); ?><div class='containerx1'><ul class='responsive-table ulx1'><li class='table-header'><div class='cola cola-1'>No</div><div class='cola cola-2'>Name</div><div class='cola cola-3'>Email</div><div class='cola cola-4'>Account No</div> </li></ul><div><div class='containerx'><ul class='responsive-table'><?php $m=0; while($rows=$result->fetch_assoc()) { $m+=1; ?><li class='table-row trn'><div class='cola cola-1'><?php echo $m;?></div><div class='cola cola-2'><?php echo $rows['name'];?></div><div class='cola cola-3'><?php echo $rows['email']; ?></div><div class='cola cola-4'><?php echo $rows['acc_no'];?></div></li><?php } ?></ul></div></div>";


            var buttons = document.getElementsByClassName("trn");
            var buttonsCount = buttons.length;
            for (var i = 0; i < buttonsCount; i += 1) {
                // buttons[i].onclick = function(e) {
                //     alert(this.innerHTML);
                // }
                var cptxt;
                buttons[i].onclick = function() {
                    cptxt=this.childNodes[2].innerHTML;
                    // document.execCommand("copy");
                    trct();
                    document.getElementById("rec").value=cptxt;
                    document.getElementById("ana").focus();
                }
                // buttons[i].addEventListener("copy", function(event) {
                //     event.preventDefault();
                //     // setTimeout(() => {
                //         if (event.clipboardData) {
                //             alert(cptxt+" copied to clipBoard");
                //             event.clipboardData.setData("text/plain", cptxt);
                //             // console.log(event.clipboardData.getData("text"))
                //         }
                //         else{
                //             alert("not copied");
                //         }
                //     });
                // }, 100); 
            }
        }
        <?php
        if(isset($_GET['tr'])){
            ?>
            trht();
            <?php
        } else { ?>
            prfl();
        <?php } ?>
</script>
</body>
</html>