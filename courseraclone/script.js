const explore = document.querySelector(".explore-button");
const overlay = document.querySelector(".overlay");
const nav = document.querySelectorAll('.nav');
// const body = document.querySelector("body");
window.onscroll=(e)=>{
    if(window.pageYOffset>0){
      nav[0].classList.add("add-shadow");
      nav[1].classList.add("add-shadow");
    }else{
      nav[0].classList.remove("add-shadow");
      nav[1].classList.remove("add-shadow");
    }
  };

const tiles = document.querySelectorAll(".tile");
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

// var breathe = setInterval(myTimer, 1000);
// var x=0;
// function myTimer() {
//   x++;
//   var y=[70,60,40,20,0];
//   var z=y[x%5]
//   document.querySelector(".items").style.marginBottom=z+"px";
// }
// document.querySelector(".items").style.transition="all 1s";


window.onresize=()=>{
  if(window.matchMedia("(max-width: 1080px)").matches){
    document.querySelector("#student").innerHTML="Students";
    document.querySelector("#enterprise").innerHTML="Enterprise";
  }
  else{
    document.querySelector("#student").innerHTML="For Students";
    document.querySelector("#enterprise").innerHTML="For Enterprise";
  }
}