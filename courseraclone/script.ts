const explore = <HTMLElement> document.querySelector(".explore-button");
const overlay = <HTMLElement> document.querySelector(".overlay");
const nav: NodeListOf<Element> =  document.querySelectorAll('.nav');
// const body = document.querySelector("body");
window.onscroll = () => {
    nav.forEach(element => {
        window.scrollY>0 ? element.classList.add("add-shadow") : element.classList.remove("add-shadow");
    });
};

const tiles = document.querySelectorAll(".tile");
explore.onmouseover = () => {
    overlay.style.opacity = String(0.5);
    overlay.style.zIndex = String(2);
    //addition body.style.overflow = "hidden";
}
explore.onmouseout = () => {
    overlay.style.opacity = String(0);
    overlay.style.zIndex = String(-1);
    //addition body.style.overflow = "visible";
};

// var breathe = setInterval(myTimer, 1000);
// var x = 0;
// function myTimer() {
//   x++;
//   var y = [70,60,40,20,0];
//   var z = y[x%5]
//   document.querySelector(".items").style.marginBottom = z + "px";
// }
// document.querySelector(".items").style.transition = "all 1s";

const studentLabel = <HTMLElement>document.querySelector("#student");
const enterpriseLabel = <HTMLElement>document.querySelector("#enterprise");
window.onresize = () => {
    [ studentLabel.innerHTML, enterpriseLabel.innerHTML ] = 
        window.matchMedia("(max-width: 1080px)").matches ? [ "Students", "Enterprise" ] : [ "For Students", "For Enterprise" ]
};