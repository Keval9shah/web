const explore = document.querySelector(".explore-button");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector('.nav');
// const body = document.querySelector("body");
window.onscroll=(e)=>{
    if(window.pageYOffset>0){
      nav.classList.add("add-shadow");
    }else{
      nav.classList.remove("add-shadow");
    }
  };
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

// var breathe = setInterval(myTimer, 7000);
// var x=0;
// function myTimer() {
//   x++;
//   var y=[2,8];
//   var z=y[x%2]
//   nav.style.borderBottom=z+"px rgb(224, 224, 224) solid";
// }