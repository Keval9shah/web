var x = 1;
var y = "green";
var z = "2";
var l = document.getElementsByClassName("bttn");
var m = document.getElementsByTagName("img");
document.getElementById('scnd').style.width = document.getElementById('bttn1').offsetWidth + 1;

function ifun() {
    document.getElementById('i').style.display = "none";
    document.getElementById('i1').style.display = "inline-flex";
    document.getElementsByClassName("frst")[0].style.display = "block";
    document.getElementById("i1").style.left = document.getElementsByClassName('frst')[0].offsetWidth - 100;
}

function ifun2() {
    document.getElementById('i1').style.display = "none";
    document.getElementById('i').style.display = "inline-flex";
    document.getElementsByClassName("frst")[0].style.display = "none";
}

function myFun() {
    x++;
    if (x % 2 == 1) {
        document.getElementsByTagName("div")[0].style.width = "22%";
        document.getElementById("i1").style.left = document.getElementsByClassName('frst')[0].offsetWidth - 100;
        document.getElementById("bttn1").innerHTML = "background image";
        document.getElementById('scnd').style.width = document.getElementById('bttn1').offsetWidth + 0.5;
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = y;
        for (i = 0; i < l.length; i++) {
            l[i].style.display = "inline-block";
        }
        for (i = 0; i < m.length; i++) {
            m[i].style.display = "none";
        }
    } else {
        //41%
        document.getElementsByTagName("div")[0].style.width = "41%";
        document.getElementById("i1").style.left = document.getElementsByClassName('frst')[0].offsetWidth - 100;
        document.body.style.backgroundImage = "url(" + document.getElementById(z).src + ")";
        document.getElementById("bttn1").innerHTML = "background color";
        document.getElementById('scnd').style.width = document.getElementById('bttn1').offsetWidth;
        for (i = 0; i < l.length; i++) {
            l[i].style.display = "none";
        }
        for (i = 0; i < m.length; i++) {
            m[i].style.display = "inline-block";
        }
    }
    if (x > 4) {
        x = x - 2;
    }
}

function Fun(n) {
    if (x % 2 == 0) {
        x++;
    }
    document.getElementById("bttn1").innerHTML = "background image";
    y = n;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = n;
}

function fntn(url) {
    document.body.style.backgroundImage = "url(" + url + ")";
}