<?php
require('connection.inc.php');

if(isset($_POST['submit'])){
    $username=$_POST['name'];
    $email=$_POST['email'];
    $email=strtolower($email);
    $password=$_POST['password'];
    $balance=1000;

    //name
    //email
    //password
    //acc_no
    //balance

    $lastrow=mysqli_query($con,"SELECT acc_no FROM user ORDER BY acc_no DESC LIMIT 1"); 
    if(mysqli_num_rows($lastrow)>0){
        $last_acc=mysqli_fetch_object($lastrow)->acc_no;
        $ano=$last_acc+69;
    }
    else{
        $ano=10080085;
    }

    $c = mysqli_query($con,"SELECT email FROM user WHERE email='$email' ");
    // echo mysqli_num_rows($c);
    if ($username){
        if(mysqli_num_rows($c) == 0){
            //sign up
            // echo "sign up";
            $sql="INSERT INTO user (name, email, password,acc_no,balance) VALUES ('$username','$email','$password','$ano','$balance')";
            mysqli_query($con,$sql);
            session_start();
            $res=mysqli_query($con,"SELECT acc_no FROM user WHERE email='$email' AND password='$password' ");
            $row = mysqli_fetch_assoc($res);
            $_SESSION['acc_no'] = $row['acc_no'];
            header("location:details.php");
        }
        else{
            echo '<script type="text/javascript">alert("Email already exists");</script>';
        }
    // echo '<script type="text/javascript">alert("'.mysqli_fetch_object($c)->email.'");</script>';
    }
    else{
        //login
        $res = mysqli_query($con,"SELECT acc_no FROM user WHERE email='$email' AND password='$password' ");
        if ($res->num_rows > 0){
            session_start();
            $row = mysqli_fetch_assoc($res);
            $_SESSION['acc_no'] = $row['acc_no'];
            header("location:details.php");
        }
        else{
            echo "<script>alert('Woops! Email or Password is wrong.')</script>";
        }
    }
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Bank</title>
</head>

<body>
    <div class="grd">
        <div class="g1"><img class="prop" src="money.jpg"></div>
        <div class="g2">
            <img class="logo" src="logo.png" alt="">
            <img class="prop2" src="prop2.svg" alt="">
            <div class="txt">Welcome to a <span class="safe">safe</span> Banking Paradise</div>
            <div class="login">
                <div class="sign">
                    <div class="sup sel1" onclick="sup()">
                        Sign up
                    </div>
                    <div class="lin" onclick="lin()">
                        Log in
                    </div>
                </div>
                <div class="sel"></div>
                <div class="fields">
                    <form action="" method="POST">
                        <div class="fields1">
                            <div class="name fl">
                                <div class="field">Name</div>
                                <div class="answer"><input id="nm" minlength="3" maxlength="18" name="name" required placeholder="Enter Name"></div>
                            </div>
                            <div class="email fl">
                                <div class="field">Email</div>
                                <div class="answer"><input id="ane" maxlength="32" type="email" name="email" required placeholder="Enter Email"></div>
                            </div>
                        </div>
                        <div class="fields1">
                            <div class="pass fl">
                                <div class="field">Password</div>
                                <div class="answer"><input class="anp" minlength="8" maxlength="16" type="password" name="password" required placeholder="Enter Password"></div>
                            </div>
                            <div class="go fl">
                                <button name="submit" type="submit" class="goo">Next <svg width="16px" height="15px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
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

    <script src="script.js"></script>
</body>

</html>