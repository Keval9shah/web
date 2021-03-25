var x = 1;
var y = "green";
var z = "https://free4kwallpapers.com/uploads/originals/2019/12/16/nature-wallpaper.jpg";
var current = "white";
var later = "white";
var l = document.getElementsByClassName("bttn");
var m = document.getElementsByClassName("bttn2");

function ifun() {
    document.getElementById('i').style.display = "none";
    document.getElementById('i1').style.display = "inline-flex";
    document.getElementsByClassName("frst")[0].style.display = "block";
    var col = document.getElementById("33");
    col.addEventListener("input", function() {
        document.body.style.backgroundColor = col.value;
        y = col.value;
        current = col.value;
    });
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
        document.getElementsByTagName("div")[0].style.width = "40%";
        document.body.style.backgroundImage = "url(" + z + ")";
        document.getElementById("bttn1").innerHTML = "background color";
        document.getElementById('scnd').style.width = document.getElementById('bttn1').offsetWidth;
        for (i = 0; i < l.length; i++) {
            l[i].style.display = "none";
        }
        for (i = 0; i < m.length; i++) {
            m[i].style.display = "inline-block";
        }
        var inpimg = document.getElementById("intxt");
        inpimg.addEventListener("input", function() {
            z = inpimg.value;
            inpimg.value = "";
            document.body.style.backgroundImage = "url(" + z + ")";
            inpimg.style.backgroundSize = "cover";
            inpimg.style.backgroundImage = "url(" + z + ")";
        });
    }
    if (x > 4) {
        x = x - 2;
    }
}

function crntt() {
    document.body.style.backgroundColor = set;
    y = set;
}

function sett() {
    set = current;
    document.getElementById("crnt").style.backgroundColor = current;
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
    z = url;
    document.body.style.backgroundImage = "url(" + url + ")";
}