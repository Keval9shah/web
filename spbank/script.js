var supp = document.getElementsByClassName("sup")[0];
var linn = document.getElementsByClassName("lin")[0]
var sel = document.getElementsByClassName("sel")[0];
var name_fld = document.getElementsByClassName("name")[0];
var email_fld = document.getElementsByClassName("email")[0];
var pass = document.getElementsByClassName("anp")[0];

function sup() {
    sel.style.left = "3px";
    sel.style.width = "90px";
    linn.classList.remove("sel1");
    supp.classList.add("sel1");
    name_fld.style.display = "block";
    email_fld.style.marginLeft = "40px";
    pass.style.width = "240px";
    pass.placeholder = "Enter Password";
    document.getElementById("ane").style.width = "180px";
    document.getElementById("nm").required = true;
}

function lin() {
    linn.classList.add("sel1");
    supp.classList.remove("sel1");
    sel.style.left = "96px";
    sel.style.width = "76px";
    document.getElementById("nm").value = "";
    name_fld.style.display = "none";
    email_fld.style.marginLeft = "0";
    pass.style.width = "180px";
    pass.placeholder = "Password";
    document.getElementById("ane").style.width = "200px";
    document.getElementById("nm").required = false;
}