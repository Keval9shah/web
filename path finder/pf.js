document.write("<div class='grid'>");
var size = [5, 7];
for (var i = 1; i < (size[0] * size[1]) + 1; i++) {
    document.write("<button onclick='clicked(this.id)' id='x" + i + "'></button>");
}
document.write("</div>");
var btnWd = 68;
var btnWd2 = 85;
var notecheck = 1;

document.getElementsByTagName("h3")[0].innerHTML = "Path Finder   (" + size[0] + "x" + size[1] + ")";
if (window.matchMedia("(max-width: 1680px) and (min-width:1080px)").matches) {
    btnWd = 72;
    btnWd2 = 88;
} else if (window.matchMedia("(max-width: 1080px) and (min-width:787px)").matches) {
    btnWd = 68;
    btnWd2 = 85;
} else if (window.matchMedia("(max-width: 787px) and (min-width:399px)").matches) {
    btnWd = 63;
    btnWd2 = 72;
}

document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + size[0] + ", clamp(" + btnWd + "px, 12%, " + btnWd2 + "px)";


var arr = new Array(size[0]).fill(0).map(() => new Array(size[1]).fill(0).map(() => new Array(3).fill(0)));
var sd = new Array(2).fill(-1).map(() => new Array(2).fill(-1));
var pinFull = 3;


var info = document.getElementById("info");
var txt = document.getElementsByClassName("txt")[0];
var grid = document.getElementsByClassName("grid")[0];
var lng = document.getElementById("x1").offsetWidth;
x = 55 + 45 + 5 * lng;
if (window.matchMedia("(max-width:1680px) and (min-width:1080px)").matches) {
    info.style.top = "180px";
    txt.style.top = "80px";
    info.style.left = x + 15 + "px";
} else if (window.matchMedia("(max-width: 1080px) and (min-width:787px)").matches) {
    info.style.top = "180px";
    txt.style.top = "80px";
    info.style.left = x + 15 + "px";
} else { grid.style.width = x - 45 + "px"; }

window.addEventListener('resize', () => {
    location.reload();
});

function zoomIn(x) {
    var Page = document.getElementById('Body');
    var zoom = parseInt(Page.style.zoom) + x + '%';
    Page.style.zoom = zoom;
}
if (window.matchMedia("(max-width:430px)").matches) {
    console.log("hii");
    zoomIn(20);
}

function clicked(xclass) {
    var x, y;
    var xcls = parseInt(xclass.substring(1));
    x = (xcls - 1) % size[0];
    y = parseInt((xcls - 1) / size[0]);
    if (x == sd[0][0] && y == sd[0][1]) {
        sd[0][0] = -1;
        sd[0][1] = -1;
        pinFull = 3;
    } else if (x == sd[1][0] && y == sd[1][1]) {
        sd[1][0] = -1;
        sd[1][1] = -1;
        pinFull = 3;
    }
    arr[x][y][0] += 1;
    arr[x][y][0] = arr[x][y][0] % pinFull;
    if (arr[x][y][0] == 0) {
        document.getElementById(xclass).innerHTML = "";
        click0(xclass);
    } else if (arr[x][y][0] == 1) {
        document.getElementById(xclass).innerHTML = "";
        click1(xclass);
    } else {
        var use = document.getElementById(xclass);
        if (sd[0][0] == -1) {
            use.innerHTML = "src";
            sd[0][0] = x;
            sd[0][1] = y;
            click2(xclass);
            if (sd[1][0] != -1) {
                pinFull = 2;
            }
        } else if (sd[1][0] == -1) {
            use.innerHTML = "dest";
            sd[1][0] = x;
            sd[1][1] = y;
            pinFull = 2;
            click2(xclass);
        }
    }
}

function click0(xclass) {
    document.getElementById(xclass).style.background = "white";
}

function click1(xclass) {
    document.getElementById(xclass).style.background = "#0b032d";
}

function click2(xclass) {
    document.getElementById(xclass).style.background = "#B6CEC7";
}

setTimeout(() => {
    var note = document.createElement("div");
    note.id = "note";
    document.getElementById("bottom").appendChild(note);
}, 1000);


function fiind() {
    if (sd[0][0] == -1 || sd[1][0] == -1) {
        note.innerHTML = "Select Source and Destination";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
        return 0;
    } else if ((Math.abs(sd[0][0] - sd[1][0]) + Math.abs(sd[0][1] - sd[1][1])) == 1) {
        note.innerHTML = "They are side by side";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
        return 0;
    }

    var no;
    var now = sd[0];
    for (let i = 0; 1; i++) {
        nearbyBtns(now);
        now = [...findMin()];
        var a = now[0] + 1 + now[1] * size[0];
        timeout(sd, now, a, i);
        if (now[0] == sd[1][0] && now[1] == sd[1][1]) {
            break;
        }
        no = i;
    }
    document.getElementById("steps").innerHTML = no + 1;

    if (notecheck) {
        notecheck = 0;
        note.innerHTML = "Note : To Replay Click Find Again.";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
    }
}

function timeout(sd, now, a, i) {
    setTimeout(function() {
        if (now[0] != sd[1][0] || now[1] != sd[1][1]) {
            document.getElementById("x" + a).style.background = "green";
            document.getElementById("x" + a).innerHTML = (i + 1).toString();
        }
        if (now[0] == sd[1][0] && now[1] == sd[1][1]) {
            document.getElementById("x" + a).style.background = "#FFD700";
        }
    }, 200 + 200 * i);
}

function findMin() {
    var minn = 1000,
        m, n;
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            if (arr[i][j][1] != 0 && arr[i][j][1] < minn && arr[i][j][2] != 1) {
                minn = arr[i][j][1];
                m = i;
                n = j;
            }
        }
    }
    if (m != sd[1][0] || n != sd[1][1]) {
        arr[m][n][2] = 1;
    }
    return [m, n];
}

function nearbyBtns(Btn) {
    var cBtn;
    var psblmv = [
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 1],
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ];
    psblmv.forEach(emt => {
        cBtn = [...Btn];
        cBtn[0] += emt[0];
        cBtn[1] += emt[1];
        if (cBtn[0] >= 0 && cBtn[0] < size[0] && cBtn[1] >= 0 && cBtn[1] < size[1] && arr[cBtn[0]][cBtn[1]][0] != 1) {
            if ((cBtn[0] != sd[0][0] || cBtn[1] != sd[0][1]) && arr[cBtn[0]][cBtn[1]][1] == 0) {
                arr[cBtn[0]][cBtn[1]][1] = findDist(cBtn);
            }
        }
    });
}

function findDist(x) {
    crntBtn = [x[0], x[1]];
    //destdist
    var destDist = new Array(5).fill(0); //Array(5);
    destDist[0] = Math.abs(crntBtn[0] - sd[1][0]);
    destDist[1] = Math.abs(crntBtn[1] - sd[1][1]);
    destDist[3] = Math.min(destDist[0], destDist[1])
    destDist[2] = destDist[3] * 14 + (destDist[0] - destDist[3]) * 10 + (destDist[1] - destDist[3]) * 10;

    // src
    destDist[0] = Math.abs(crntBtn[0] - sd[0][0]);
    destDist[1] = Math.abs(crntBtn[1] - sd[0][1]);
    destDist[3] = Math.min(destDist[0], destDist[1])
    destDist[4] = destDist[3] * 4 + (destDist[0] - destDist[3]) * 3 + (destDist[1] - destDist[3]) * 3;
    if (x[0] == sd[1][0] && x[1] == sd[1][1]) {
        return 1;
    }
    return destDist[2] + destDist[4];
}

function reset() {
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            for (let k = 0; k < 3; k++) {
                arr[i][j][k] = 0;
            }
        }
    }
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            sd[i][j] = -1;
        }
    }
    for (let i = 1; i < (size[0] * size[1]) + 1; i++) {
        document.getElementById("x" + i).style.background = "white";
        document.getElementById("x" + i).innerHTML = "";
    }
    pinFull = 3;
}

function editMode(callback) {
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            for (let k = 0; k < 3; k++) {
                if (k != 0) {
                    if (k == 2 && arr[i][j][k] == 1 && arr[i][j][0] == 0) {
                        var temp = i + 1 + j * size[0];
                        document.getElementById("x" + temp).style.background = "white";
                        document.getElementById("x" + temp).innerHTML = "";
                    }
                    arr[i][j][k] = 0;
                } else if (arr[i][j][k] == 2) {
                    var tmp = i + 1 + j * size[0];
                    document.getElementById("x" + tmp).style.background = "#B6CEC7";
                }
            }
        }
    }
    callback();
}

var e = document.getElementById("slct");

function plus() {
    var buton;
    if (e.options[e.selectedIndex].value == "row") {
        var uls;
        for (let i = 0; i < size[0]; i++) {
            buton = document.createElement("button");
            uls = size[0] * size[1] + 1 + i;
            document.getElementsByClassName("grid")[0].appendChild(buton);
            buton.outerHTML = "<button onclick='clicked(this.id)' id='x" + uls + "'></button>";
            arr[i].push([0, 0, 0]);
        }
        size[1] += 1;
    } else if (e.options[e.selectedIndex].value == "clm") {
        arr.push([]);
        var x = size[0] + 1; //experiment
        document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + x + ", clamp(" + btnWd + "px, 12%, " + btnWd2 + "px)";
        for (let i = 0; i < size[1]; i++) {
            buton = document.createElement("button");
            uls = size[0] * size[1] + 1 + i;
            document.getElementsByClassName("grid")[0].appendChild(buton);
            buton.outerHTML = "<button onclick='clicked(this.id)' id='x" + uls + "'></button>";
            arr[size[0]].push([0, 0, 0]);
        }
        size[0] += 1;
        var xx;
        for (let i = 0; i < size[0]; i++) {
            for (let j = 0; j < size[1]; j++) {
                xx = i + 1 + j * size[0];
                document.getElementById("x" + xx).style.background = "white";
                document.getElementById("x" + xx).innerHTML = "";
                if (arr[i][j][0] == 1) {
                    document.getElementById("x" + xx).style.background = "#0b032d";
                } else if (arr[i][j][0] == 2) {
                    document.getElementById("x" + xx).style.background = "#B6CEC7";
                    if (i == sd[0][0] && j == sd[0][1]) {
                        document.getElementById("x" + xx).innerHTML = "src";
                    } else {
                        document.getElementById("x" + xx).innerHTML = "dest";
                    }
                }
            }
        }
    }
    document.getElementsByTagName("h3")[0].innerHTML = "Path Finder   (" + size[0] + "x" + size[1] + ")";
    var lng = document.getElementById("x1").offsetWidth;
    x = 55 + 45 + size[0] * lng;
    if (window.matchMedia("(min-width: 1000px)").matches) {
        info.style.left = x + 15 + "px";
    } else {
        grid.style.width = x - 45 + "px";
    }
}

function minus() {
    var buton;
    if (e.options[e.selectedIndex].value == "row") {
        if (size[1] <= 0) {
            return 0;
        }
        var uls;
        for (let i = 0; i < size[0]; i++) {
            uls = size[0] * (size[1] - 1) + 1 + i;
            buton = document.getElementById("x" + uls);
            buton.outerHTML = "";
            arr[i].pop();
        }
        size[1] -= 1;
    } else if (e.options[e.selectedIndex].value == "clm") {
        arr.pop();
        var x = size[0] - 1; //experiment
        if (size[0] <= 0) {
            return 0;
        }
        document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + x + ", clamp(" + btnWd + "px, 12%, " + btnWd2 + "px)";
        for (let i = 0; i < size[1]; i++) {
            uls = (size[0] - 1) * size[1] + 1 + i;
            buton = document.getElementById("x" + uls);
            buton.outerHTML = "";
        }
        size[0] -= 1;
        var xx;
        for (let i = 0; i < size[0]; i++) {
            for (let j = 0; j < size[1]; j++) {
                xx = i + 1 + j * size[0];
                document.getElementById("x" + xx).style.background = "white";
                document.getElementById("x" + xx).innerHTML = "";
                if (arr[i][j][0] == 1) {
                    document.getElementById("x" + xx).style.background = "#0b032d";
                } else if (arr[i][j][0] == 2) {
                    document.getElementById("x" + xx).style.background = "#B6CEC7";
                    if (i == sd[0][0] && j == sd[0][1]) {
                        document.getElementById("x" + xx).innerHTML = "src";
                    } else {
                        document.getElementById("x" + xx).innerHTML = "dest";
                    }
                }
            }
        }
    }
    if (sd[0][0] >= size[0] || sd[0][1] >= size[1]) {
        sd[0][0] = -1;
        sd[0][1] = -1;
        pinFull = 3;
    }
    if (sd[1][0] >= size[0] || sd[1][1] >= size[1]) {
        sd[1][0] = -1;
        sd[1][1] = -1;
        pinFull = 3;
    }
    document.getElementsByTagName("h3")[0].innerHTML = "Path Finder   (" + size[0] + "x" + size[1] + ")";
    var lng = document.getElementById("x1").offsetWidth;
    x = 55 + 45 + size[0] * lng;
    if (window.matchMedia("(min-width: 1000px)").matches) {
        info.style.left = x + 15 + "px";
    } else {
        grid.style.width = x - 45 + "px";
    }
}