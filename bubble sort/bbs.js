var x = 2;
var para = 1;

document.getElementById("tbl").addEventListener("keydown", async(event) => {
    if (event.which == '13' && para == 1) {
        await add();
        var tbll = document.getElementById("tbl").rows.length - 1;
        document.getElementById(tbll).childNodes[1].firstChild.focus();
    }
});

async function add() {
    document.getElementById("tbl").insertRow(x).outerHTML = "<tr id='" + x + "'><td class='no'>" + x + "</td><td><input onkeydown='go_down(event,this.parentNode.parentNode.id)' type='text' placeholder=' val'></td><td><button class='minus' onclick='remove(this.parentNode.parentNode.id)'>-</button></td></tr>";
    x += 1;
}

function remove(n) {
    document.getElementById(n).outerHTML = "";
    var nos = document.getElementsByClassName("no");
    var inps = document.getElementsByTagName("tr");
    var x1;
    for (i = 0; i < nos.length; i++) {
        x1 = i + 1;
        nos[i].innerHTML = x1;
        inps[x1].id = x1;
    }
    x -= 1;
}

function go_down(e, n) {
    var m = parseInt(n);
    var x3 = m - 1;
    var tl = document.getElementById("tbl").rows.length - 1;
    if (e.which == '40' || e.which == '13') {
        if (m < tl) {
            var x2 = m + 1;
            para = 0;
            document.getElementById(x2).childNodes[1].firstChild.focus();
        } else {
            para = 1;
        }
    } else if (e.which == '38' && m > 2) {
        document.getElementById(x3).childNodes[1].firstChild.focus();
    } else if (e.which == '38' && m == 2) {
        document.getElementsByTagName("input")[0].focus();
    }
}

function sort() {
    var elems = document.getElementsByTagName("input");
    var arr = new Array(elems.length);
    for (i = 0; i < elems.length; i++) {
        arr[i] = parseInt(elems[i].value);
    }
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    for (i = 0; i < elems.length; i++) {
        elems[i].value = arr[i];
    }
}

function reset() {
    var elems = document.getElementsByTagName('input');
    for (i = 0; i < elems.length; i++) {
        elems[i].value = "";
    }
}