const explore = document.querySelector(".explore-button");
const overlay = document.querySelector(".overlay");
// const body = document.querySelector("body");
window.onscroll=(e)=>{
    const nav = document.querySelector('.nav');
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