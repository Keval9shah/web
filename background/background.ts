var x = 1;
var defaultColor = "green";
var defaultImageURL = "https://free4kwallpapers.com/uploads/originals/2019/12/16/nature-wallpaper.jpg";
var current = "white";
var set = "white";
var colorButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".background-button");
var imageButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".hide-button");
var e: HTMLSelectElement, inpimg: HTMLInputElement;
var optionToolkit = <HTMLElement>document.querySelector(".option-toolkit");
var toggleButton = <HTMLElement>document.querySelector("#toggle-button");

function openMenu() {
    $("#i").css('display','none');
    $("#i1").css('display','inline-flex');
    optionToolkit.style.display = "block";
    var col = <HTMLInputElement>document.querySelector("#33");
    col.addEventListener("input", function() {
        document.body.style.backgroundColor = col.value;
        defaultColor = col.value;
        current = col.value;
    });
}

function closeMenu() {
    $("#i1").css('display','none');
    $("#i").css('display','inline-flex');
    optionToolkit.style.display = "none";
}

function toggleColorImage() {
    x++;
    if (x % 2 == 1) {
        optionToolkit.style.width = "22%";
        toggleButton.innerText = "background image";
        (<HTMLElement>document.querySelector("#scnd")).style.width = (toggleButton.offsetWidth + 0.5).toString();
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = defaultColor;
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].style.display = "inline-block";
        }
        for (let i = 0; i < imageButtons.length; i++) {
            imageButtons[i].style.display = "none";
        }
    } else {
        optionToolkit.style.width = "40%";
        document.body.style.backgroundImage = "url(" + defaultImageURL + ")";
        toggleButton.innerText = "background color";
        (<HTMLElement>document.querySelector("#scnd")).style.width = toggleButton.offsetWidth.toString();
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
            }, 8000);
        });
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

function setBackgroundColor(color: string) {
    x%2 == 0 && x++;
    defaultColor = color;
    $(".background-body").css('background-color', color);
}

function setBackgroundImage(url: string) {
    defaultImageURL = url;
    $(".background-body").css('background-image', "url(" + defaultImageURL + ")");
}