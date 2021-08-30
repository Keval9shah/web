const explore = document.querySelector(".explore-button");
const overlay = document.querySelector(".overlay");
//addition const body = document.querySelector("body");
explore.onmouseover = ()=>{
    overlay.style.opacity=0.5;
    overlay.style.zIndex=2;
    //addition body.style.overflow="hidden";
}
explore.onmouseout = ()=>{
    overlay.style.opacity=0;
    overlay.style.zIndex=-1;
    //addition body.style.overflow="visible";
}