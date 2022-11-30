"use strict";
var x = 1;
var defaultColor = "green";
var defaultImageURL = "https://free4kwallpapers.com/uploads/originals/2019/12/16/nature-wallpaper.jpg";
var current = "white";
var set = "white";
var colorButtons = document.querySelectorAll(".background-button");
var imageButtons = document.querySelectorAll(".hide-button");
var e, inpimg;
var optionToolkit = document.querySelector(".option-toolkit");
var toggleButton = document.querySelector("#toggle-button");
const showInline = (buttons) => {
    buttons.forEach(button => {
        button.style.display = "inline-block";
    });
};
const hide = (buttons) => {
    buttons.forEach(button => {
        button.style.display = "none";
    });
};
function openMenu() {
    $("#i").css('display', 'none');
    $("#i1").css('display', 'inline-flex');
    optionToolkit.style.display = "block";
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
    optionToolkit.style.display = "none";
}
function toggleColorImage() {
    x++;
    if (x % 2 == 1) {
        optionToolkit.style.width = "22%";
        toggleButton.innerText = "background image";
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = defaultColor;
        hide(imageButtons);
        showInline(colorButtons);
    }
    else {
        optionToolkit.style.width = "40%";
        document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
        toggleButton.innerText = "background color";
        hide(colorButtons);
        showInline(imageButtons);
        inpimg = document.querySelector("#intxt");
        e = document.querySelector("#slct");
        inpimg.oninput = () => {
            defaultImageURL = inpimg.value;
            document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
            inpimg.style.backgroundSize = "cover";
            setTimeout(() => {
                inpimg.value = "";
            }, 8000);
        };
    }
    if (x > 4) {
        x -= 2;
    }
}
function currentSelectedColor() {
    document.body.style.backgroundColor = set;
    defaultColor = set;
}
function storeSelectedColor() {
    set = current;
    $("#current-color").css('background-color', current);
}
function onImageSizeSelection() {
    document.body.style.backgroundSize = e.options[e.selectedIndex].value;
}
function setBackgroundColor(color) {
    x % 2 == 0 && x++;
    defaultColor = color;
    $(".background-body").css('background-color', color);
}
function setBackgroundImage(url) {
    defaultImageURL = url;
    $(".background-body").css('background-image', "url(" + defaultImageURL + ")");
}
