document.write("<div>");
for (var i = 1; i < 36; i++) {
    document.write("<button onclick='clicked(this.id)' id='x" + i + "'></button>");
}
document.write("</div><button onclick='fiind()' style='padding:0 35px;height:38px; margin:30px 0 0 55px;border-radius: 3px;border: none;'>Find</button>");

const size = [5, 7];
var arr = new Array(size[0]).fill(0).map(() => new Array(size[1]).fill(0).map(() => new Array(3).fill(0)));
var sd = new Array(2).fill(-1).map(() => new Array(2).fill(-1));
var pinFull = 3;
var notFound = 1;

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
            // console.log(x + "," + y);
        } else if (sd[1][0] == -1) {
            use.innerHTML = "dest";
            sd[1][0] = x;
            sd[1][1] = y;
            pinFull = 2;
            click2(xclass);
            // console.log(x + "," + y);
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

function fiind() {
    if (sd[0][0] == -1 || sd[1][0] == -1) {
        console.log("select source & destination");
        return 0;
    } else if ((Math.abs(sd[0][0] - sd[1][0]) + Math.abs(sd[0][1] - sd[1][1])) == 1) {
        console.log("1");
        return 0;
    }

    // var exploredlist = new Array(5).fill(-1).map(() => new Array(7).fill(-1));
    // while (notFound) {

    // }
    // var dist =
    var now = sd[0];

    for (let i = 0; i < 10; i++) {
        nearbyBtns(now);
        now = [...findMin()];
        var a = now[0] + 1 + now[1] * 5;
        // console.log(now);
        document.getElementById("x" + a).style.background = "green";
        // document.getElementById("x" + a).innerHTML = i.toString() + findDist(now).toString();
        if (now[0] == sd[1][0] && now[1] == sd[1][1]) {
            break;
        }
    }

    // nearbyBtns([4, 5]);

}

function findMin() {
    var minn = 1000,
        m, n;
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            // if (arr[i][j][1] == minn && (i != sd[1][0] || j != sd[1][1])) {
            //     arr[i][j][2] = 1;
            //     console.log(i + "," + j + ".,.,.");
            // } else 
            if (arr[i][j][1] != 0 && arr[i][j][1] < minn && arr[i][j][2] != 1) {
                minn = arr[i][j][1];
                m = i;
                n = j;
            }
        }
    }
    arr[m][n][2] = 1;
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
                var a = cBtn[0] + 1 + cBtn[1] * 5;
                document.getElementById("x" + a).style.background = "red";
                arr[cBtn[0]][cBtn[1]][1] = findDist(cBtn);
                // console.log(cBtn + "," + arr[cBtn[0]][cBtn[1]][1] + "," + emt);
            }
        }
    });
}

function findDist(x) {
    crntBtn = [x[0], x[1]];
    //destdist
    var destDist = new Array(3).fill(0);
    destDist[0] = Math.abs(crntBtn[0] - sd[1][0]);
    destDist[1] = Math.abs(crntBtn[1] - sd[1][1]);
    var mindist = Math.min(destDist[0], destDist[1])
    destDist[2] = mindist * 14 + (destDist[0] - mindist) * 10 + (destDist[1] - mindist) * 10;
    //srcdist
    var srcDist = new Array(3).fill(0);
    srcDist[0] = Math.abs(crntBtn[0] - sd[0][0]);
    srcDist[1] = Math.abs(crntBtn[1] - sd[0][1]);
    var mindist = Math.min(srcDist[0], srcDist[1])
    srcDist[2] = mindist * 10 + (srcDist[0] - mindist) * 10 + (srcDist[1] - mindist) * 10;
    if (x[0] == sd[1][0] && x[1] == sd[1][1]) {
        return 1;
    } else {
        return srcDist[2] + destDist[2];
    }
}