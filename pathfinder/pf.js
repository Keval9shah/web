document.write("<div class='grid'>");
var size = [10, 7];
for (var i = 1; i < (size[0] * size[1]) + 1; i++) {
    document.write("<button onmousedown='clicked(this.id)' id='x" + i + "'></button>");
}
document.write("</div>");
var notecheck = 1;

document.getElementsByTagName("h3")[0].innerHTML = "Path Finder   (" + size[0] + "x" + size[1] + ")";

if(window.matchMedia("(max-width: 430px) and (min-width:50px)").matches) {
    document.querySelector("select").selectedIndex = 1;
}

document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + size[0] + ", 48px";

let arr = new Array(size[0]).fill(0).map(() => new Array(size[1]).fill(0).map(() => new Array(3).fill(0)));
let endpointsArr = new Array(2).fill(-1).map(() => new Array(2).fill(-1));
let pinFull = 3;


//check for await in setTimeout
clicked("x24");
clicked("x24");
clicked("x37");
clicked("x37");
const obstacles = [[5,8,10],[11,15,17],[23,25,26,28],[32,35,39],[43,46,47],[51,59],[63,65]];
obstacles.forEach((points,i) => {
    setTimeout(() => {
        points.forEach(point => {
            clicked("x"+point.toString());
        })
    }, 150*i);
})
setTimeout(() => {
    fiind();
}, 150*obstacles.length);

let info = document.getElementById("info");
let txt = document.getElementsByClassName("txt")[0];
let grid = document.getElementsByClassName("grid")[0];
let lng = document.getElementById("x1").offsetWidth;
x = 55 + 45 + size[0] * lng;
if(window.matchMedia("(min-width:1080px)").matches) {
    info.style.top = "180px";
    txt.style.top = "80px";
    info.style.left = x + 15 + "px";
} else if(window.matchMedia("(max-width: 1080px) and (min-width:787px)").matches) {
    info.style.top = "180px";
    txt.style.top = "80px";
    info.style.left = x + 15 + "px";
} else { grid.style.width = x - 45 + "px"; }

window.addEventListener('resize', () => {
    location.reload();
});

function clicked(xclass) {
    let x, y;
    let xcls = parseInt(xclass.substring(1));
    x = (xcls - 1) % size[0];
    y = parseInt((xcls - 1) / size[0]);
    if(x == endpointsArr[0][0] && y == endpointsArr[0][1]) {
        endpointsArr[0][0] = -1;
        endpointsArr[0][1] = -1;
        pinFull = 3;
    } else if(x == endpointsArr[1][0] && y == endpointsArr[1][1]) {
        endpointsArr[1][0] = -1;
        endpointsArr[1][1] = -1;
        pinFull = 3;
    }
    arr[x][y][0] += 1;
    arr[x][y][0] = arr[x][y][0] % pinFull;
    if(arr[x][y][0] == 0) {
        document.getElementById(xclass).innerHTML = "";
        click0(xclass);
    } else if(arr[x][y][0] == 1) {
        document.getElementById(xclass).innerHTML = "";
        click1(xclass);
    } else {
        var use = document.getElementById(xclass);
        if(endpointsArr[0][0] == -1) {
            use.innerHTML = "src";
            endpointsArr[0][0] = x;
            endpointsArr[0][1] = y;
            click2(xclass);
            if(endpointsArr[1][0] != -1) {
                pinFull = 2;
            }
        } else if(endpointsArr[1][0] == -1) {
            use.innerHTML = "dest";
            endpointsArr[1][0] = x;
            endpointsArr[1][1] = y;
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


async function fiind() {
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            for (let k = 0; k < 3; k++) {
                if(k != 0) {
                    if(k == 2 && arr[i][j][k] == 1 && arr[i][j][0] == 0) {
                        var temp = i + 1 + j * size[0];
                        document.getElementById("x" + temp).style.background = "white";
                        document.getElementById("x" + temp).innerHTML = "";
                    }
                    arr[i][j][k] = 0;
                } else if(arr[i][j][k] == 2) {
                    var tmp = i + 1 + j * size[0];
                    document.getElementById("x" + tmp).style.background = "#B6CEC7";
                }
            }
        }
    }

    if(endpointsArr[0][0] == -1 || endpointsArr[1][0] == -1) {
        note.innerHTML = "Select Source and Destination";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
        return 0;
    } else if((Math.abs(endpointsArr[0][0] - endpointsArr[1][0]) + Math.abs(endpointsArr[0][1] - endpointsArr[1][1])) == 1) {
        note.innerHTML = "They are side by side";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
        return 0;
    }

    var no;
    var now = endpointsArr[0];
    for (let i = 0; 1; i++) {
        nearbyBtns(now);
        now = [...findMin()];
        var a = now[0] + 1 + now[1] * size[0];
        await timeout(endpointsArr, now, a, i);
        if(now[0] == endpointsArr[1][0] && now[1] == endpointsArr[1][1]) {
            break;
        }
        no = i;
    }
    document.getElementById("steps").innerHTML = no + 1;

    if(notecheck) {
        notecheck = 0;
        note.innerHTML = "Note : To Replay Click Find Again.";
        setTimeout(() => {
            note.innerHTML = "";
        }, 8500);
    }
}

async function timeout(endpointsArr, now, a, i) {
    await new Promise ((res,rej) => setTimeout(function() {
        if(now[0] != endpointsArr[1][0] || now[1] != endpointsArr[1][1]) {
            document.getElementById("x" + a).style.background = "green";
            document.getElementById("x" + a).innerHTML = (i + 1).toString();
        }
        if(now[0] == endpointsArr[1][0] && now[1] == endpointsArr[1][1]) {
            document.getElementById("x" + a).style.background = "#FFD700";
        }
        res(true);
    }, 200));
}

function findMin() {
    var minn = 1000,
        m, n;
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            if(arr[i][j][1] != 0 && arr[i][j][1] < minn && arr[i][j][2] != 1) {
                minn = arr[i][j][1];
                m = i;
                n = j;
            }
        }
    }
    if(m != endpointsArr[1][0] || n != endpointsArr[1][1]) {
        arr[m][n][2] = 1;
    }
    return [m, n];
}

function nearbyBtns(Btn) {
    var cBtn;
    var psblmv = [
        // cross-move start
        // [1, -1],
        // [-1, 1],
        // [-1, -1],
        // [1, 1],
        // end
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ];
    psblmv.forEach(emt => {
        cBtn = [...Btn];
        cBtn[0] += emt[0];
        cBtn[1] += emt[1];
        if(cBtn[0] >= 0 && cBtn[0] < size[0] && cBtn[1] >= 0 && cBtn[1] < size[1] && arr[cBtn[0]][cBtn[1]][0] != 1) {
            if((cBtn[0] != endpointsArr[0][0] || cBtn[1] != endpointsArr[0][1]) && arr[cBtn[0]][cBtn[1]][1] == 0) {
                arr[cBtn[0]][cBtn[1]][1] = findDist(cBtn);
            }
        }
    });
}

function findDist(x) {
    crntBtn = [x[0], x[1]];
    //destdist
    var destDist = new Array(5).fill(0); //Array(5);
    destDist[0] = Math.abs(crntBtn[0] - endpointsArr[1][0]);
    destDist[1] = Math.abs(crntBtn[1] - endpointsArr[1][1]);
    destDist[3] = Math.min(destDist[0], destDist[1])
    destDist[2] = destDist[3] * 14 + (destDist[0] - destDist[3]) * 10 + (destDist[1] - destDist[3]) * 10;

    // src
    destDist[0] = Math.abs(crntBtn[0] - endpointsArr[0][0]);
    destDist[1] = Math.abs(crntBtn[1] - endpointsArr[0][1]);
    destDist[3] = Math.min(destDist[0], destDist[1])
    destDist[4] = destDist[3] * 4 + (destDist[0] - destDist[3]) * 3 + (destDist[1] - destDist[3]) * 3;
    if(x[0] == endpointsArr[1][0] && x[1] == endpointsArr[1][1]) {
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
    endpointsArr.forEach(point => {
        point.forEach(coordinate => {
            coordinate = -1;
        })
    })
    for (let i = 1; i < (size[0] * size[1]) + 1; i++) {
        document.getElementById("x" + i).style.background = "white";
        document.getElementById("x" + i).innerHTML = "";
    }
    pinFull = 3;
}

var e = document.getElementById("slct");

function plus() {
    var buton;
    if(e.options[e.selectedIndex].value == "row") {
        var uls;
        for (let i = 0; i < size[0]; i++) {
            buton = document.createElement("button");
            uls = size[0] * size[1] + 1 + i;
            document.getElementsByClassName("grid")[0].appendChild(buton);
            buton.outerHTML = "<button onmousedown='clicked(this.id)' id='x" + uls + "'></button>";
            arr[i].push([0, 0, 0]);
        }
        size[1] += 1;
    } else if(e.options[e.selectedIndex].value == "clm") {
        arr.push([]);
        var x = size[0] + 1; //experiment
        document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + x + ", 48px)";
        for (let i = 0; i < size[1]; i++) {
            buton = document.createElement("button");
            uls = size[0] * size[1] + 1 + i;
            document.getElementsByClassName("grid")[0].appendChild(buton);
            buton.outerHTML = "<button onmousedown='clicked(this.id)' id='x" + uls + "'></button>";
            arr[size[0]].push([0, 0, 0]);
        }
        size[0] += 1;
        var xx;
        for (let i = 0; i < size[0]; i++) {
            for (let j = 0; j < size[1]; j++) {
                xx = i + 1 + j * size[0];
                document.getElementById("x" + xx).style.background = "white";
                document.getElementById("x" + xx).innerHTML = "";
                if(arr[i][j][0] == 1) {
                    document.getElementById("x" + xx).style.background = "#0b032d";
                } else if(arr[i][j][0] == 2) {
                    document.getElementById("x" + xx).style.background = "#B6CEC7";
                    if(i == endpointsArr[0][0] && j == endpointsArr[0][1]) {
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
    if(window.matchMedia("(min-width: 1000px)").matches) {
        info.style.left = x + 15 + "px";
    } else {
        grid.style.width = x - 45 + "px";
    }
}

function minus() {
    var buton;
    if(e.options[e.selectedIndex].value == "row") {
        if(size[1] <= 0) {
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
    } else if(e.options[e.selectedIndex].value == "clm") {
        arr.pop();
        var x = size[0] - 1; //experiment
        if(size[0] <= 0) {
            return 0;
        }
        document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + x + ", clamp(48px)";
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
                if(arr[i][j][0] == 1) {
                    document.getElementById("x" + xx).style.background = "#0b032d";
                } else if(arr[i][j][0] == 2) {
                    document.getElementById("x" + xx).style.background = "#B6CEC7";
                    if(i == endpointsArr[0][0] && j == endpointsArr[0][1]) {
                        document.getElementById("x" + xx).innerHTML = "src";
                    } else {
                        document.getElementById("x" + xx).innerHTML = "dest";
                    }
                }
            }
        }
    }
    if(endpointsArr[0][0] >= size[0] || endpointsArr[0][1] >= size[1]) {
        endpointsArr[0][0] = -1;
        endpointsArr[0][1] = -1;
        pinFull = 3;
    }
    if(endpointsArr[1][0] >= size[0] || endpointsArr[1][1] >= size[1]) {
        endpointsArr[1][0] = -1;
        endpointsArr[1][1] = -1;
        pinFull = 3;
    }
    document.getElementsByTagName("h3")[0].innerHTML = "Path Finder   (" + size[0] + "x" + size[1] + ")";
    var lng = document.getElementById("x1").offsetWidth;
    x = 55 + 45 + size[0] * lng;
    if(window.matchMedia("(min-width: 1000px)").matches) {
        info.style.left = x + 15 + "px";
    } else {
        grid.style.width = x - 45 + "px";
    }
}