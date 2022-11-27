"use strict";
var x = 2;
var para = 1;
document.querySelector("#table").addEventListener("keydown", (event) => {
    if (event.which == 13 && para == 1) {
        add();
        let table = document.querySelector("#table");
        let tableLength = table.rows.length - 1;
        // let childnode = (<HTMLElement>(<HTMLElement>document.getElementById(tableLength.toString())).childNodes[1].firstChild).focus();
    }
});
function add() {
    document.querySelector("#table").insertRow(x).outerHTML = "<tr id='" + x + "'><td class='no'>" + x + "</td><td><input onkeydown='go_down(event,this.parentNode.parentNode.id)' type='text' placeholder=' val'></td><td><button class='minus' onclick='remove(this.parentNode.parentNode.id)'>-</button></td></tr>";
    x += 1;
}
function remove(ID) {
    document.getElementById(ID).outerHTML = "";
    let nos = document.getElementsByClassName("no");
    let inputs = document.getElementsByTagName("tr");
    let x1;
    for (let i = 0; i < nos.length; i++) {
        x1 = i + 1;
        nos[i].innerHTML = x1.toString();
        inputs[x1].id = x1.toString();
    }
    x -= 1;
}
function go_down(event, ID) {
    let id = parseInt(ID);
    let x3 = id - 1;
    let tableLength = document.querySelector("#table").rows.length - 1;
    if (event.which == 40 || event.which == 13) {
        if (id < tableLength) {
            var x2 = id + 1;
            para = 0;
            document.getElementById(x2.toString()).childNodes[1].firstChild.focus();
        }
        else {
            para = 1;
        }
    }
    else if (event.which == 38 && id > 2) {
        document.getElementById(x3.toString()).childNodes[1].firstChild.focus();
    }
    else if (event.which == 38 && id == 2) {
        document.getElementsByTagName("input")[0].focus();
    }
}
function sort() {
    var elems = document.getElementsByTagName("input");
    let arr = new Array(elems.length);
    for (let i = 0; i < elems.length; i++) {
        arr[i] = parseInt(elems[i].value);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    for (let i = 0; i < elems.length; i++) {
        elems[i].value = arr[i].toString();
    }
}
function reset() {
    [...document.querySelectorAll('input')].forEach(element => {
        element.value = "";
    });
}
