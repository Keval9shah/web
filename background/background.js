"use strict";
var x = 1;
var defaultColor = "green";
var defaultImageURL = "https://free4kwallpapers.com/uploads/originals/2019/12/16/nature-wallpaper.jpg";
var current = "white";
var set = "white";
var colorButtons = document.querySelectorAll(".bttn");
var imageButtons = document.querySelectorAll(".bttn2");
var e, inpimg;
function openMenu() {
    $("#i").css('display', 'none');
    $("#i1").css('display', 'inline-flex');
    document.querySelectorAll(".frst")[0].style.display = "block";
    var col = document.querySelector("#33");
    col.addEventListener("input", function () {
        document.body.style.backgroundColor = col.value;
        defaultColor = col.value;
        current = col.value;
    });
}
function closeMenu() {
    $("#i1").css('display', 'none');
    $("#i").css('display', 'inline-flex');
    document.querySelectorAll(".frst")[0].style.display = "none";
}
function toggleColorImage() {
    x++;
    if (x % 2 == 1) {
        document.getElementsByTagName("div")[0].style.width = "22%";
        document.querySelector("#bttn1").innerHTML = "background image";
        document.querySelector("#scnd").style.width = (document.querySelector("#bttn1").offsetWidth + 0.5).toString();
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = defaultColor;
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].style.display = "inline-block";
        }
        for (let i = 0; i < imageButtons.length; i++) {
            imageButtons[i].style.display = "none";
        }
    }
    else {
        document.getElementsByTagName("div")[0].style.width = "40%";
        document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
        document.querySelector("#bttn1").innerHTML = "background color";
        document.querySelector("#scnd").style.width = document.querySelector("#bttn1").offsetWidth.toString();
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].style.display = "none";
        }
        for (let i = 0; i < imageButtons.length; i++) {
            imageButtons[i].style.display = "inline-block";
        }
        inpimg = document.querySelector("#intxt");
        e = document.querySelector("#slct");
        inpimg.addEventListener("input", () => {
            defaultImageURL = inpimg.value;
            document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
            inpimg.style.backgroundSize = "cover";
            setTimeout(() => {
                inpimg.value = "";
            }, 6200);
        });
    }
    if (x > 4) {
        x = x - 2;
    }
}
function currentSelectedColor() {
    document.body.style.backgroundColor = set;
    defaultColor = set;
}
function storeSelectedColor() {
    set = current;
    $("#crnt").css('background-color', current);
}
function onImageSizeSelection() {
    document.body.style.backgroundSize = e.options[e.selectedIndex].value;
}
function setBackgroundColor(color) {
    x % 2 == 0 && x++;
    defaultColor = color;
    $("body").css('background-color', color);
}
function setBackgroundImage(url) {
    defaultImageURL = url;
    $("body").css('background-image', "url(" + defaultImageURL + ")");
}
