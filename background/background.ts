var x = 1;
var defaultColor = "green";
var defaultImageURL = "https://free4kwallpapers.com/uploads/originals/2019/12/16/nature-wallpaper.jpg";
var current = "white";
var set = "white";
var colorButtons = document.querySelectorAll(".bttn");
var imageButtons = document.querySelectorAll(".bttn2");
var e, inpimg: HTMLInputElement;

function openMenu() {
    (<HTMLElement>document.querySelector("#i")).style.display = "none";
    (<HTMLElement>document.querySelector("#i1")).style.display = "inline-flex";
    (<HTMLElement>document.querySelectorAll(".frst")[0]).style.display = "block";
    var col = <HTMLInputElement>document.querySelector("#33");
    col.addEventListener("input", function() {
        document.body.style.backgroundColor = col.value;
        defaultColor = col.value;
        current = col.value;
    });
}

function closeMenu() {
    (<HTMLElement>document.querySelector("#i1")).style.display = "none";
    (<HTMLElement>document.querySelector("#i")).style.display = "inline-flex";
    (<HTMLElement>document.querySelectorAll(".frst")[0]).style.display = "none";
}

function toggleColorImage() {
    x++;
    if (x % 2 == 1) {
        document.getElementsByTagName("div")[0].style.width = "22%";
        document.querySelector("#bttn1").innerHTML = "background image";
        document.querySelector("#scnd").style.width = document.querySelector("#bttn1").offsetWidth + 0.5;
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = defaultColor;
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].style.display = "inline-block";
        }
        for (let i = 0; i < imageButtons.length; i++) {
            imageButtons[i].style.display = "none";
        }
    } else {
        document.getElementsByTagName("div")[0].style.width = "40%";
        document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
        document.querySelector("#bttn1").innerHTML = "background color";
        document.querySelector("#scnd").style.width = document.querySelector("#bttn1").offsetWidth;
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].style.display = "none";
        }
        for (let i = 0; i < imageButtons.length; i++) {
            imageButtons[i].style.display = "inline-block";
        }
        inpimg = <HTMLInputElement>document.querySelector("#intxt");
        e = <HTMLSelectElement>document.querySelector("#slct");
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
    (<HTMLButtonElement>document.querySelector("#crnt")).style.backgroundColor = current;
}

function onImageSizeSelection() {
    document.body.style.backgroundSize = e.options[e.selectedIndex].value;
}

function setBackgroundColor(color: string) {
    if (x % 2 == 0) {
        x++;
    }
    defaultColor = color;
    document.body.style.backgroundColor = color;
}

function setBackgroundImage(url: string) {
    defaultImageURL = url;
    document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
}