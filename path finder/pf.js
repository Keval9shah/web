document.write("<div>");
for (var i = 1; i < 36; i++) {
    document.write("<button onclick='clicked(this.className)' class='x" + i + "'></button>");
}
document.write("</div><button onclick='fiind()' style='padding:0 35px;height:38px; margin:30px 0 0 55px;border-radius: 3px;border: none;'>Find</button>");

var arr = new Array(5).fill(0).map(() => new Array(7).fill(0).map(() => new Array(2).fill(0)));
var only_2_pins = new Array(2).fill(-1).map(() => new Array(2).fill(-1));
var pinFull = 3;
var notFound = 1;

function clicked(xclass) {
    var x, y;
    var xcls = parseInt(xclass.substring(1));
    x = (xcls - 1) % 5;
    y = parseInt((xcls - 1) / 5);
    arr[x][y][0] += 1;
    arr[x][y][0] = arr[x][y][0] % pinFull;
    if (arr[x][y][0] == 0) {
        if (x == only_2_pins[0][0] && y == only_2_pins[0][1]) {
            only_2_pins[0][0] = -1;
            only_2_pins[0][1] = -1;
            pinFull = 3;
        } else if (x == only_2_pins[1][0] && y == only_2_pins[1][1]) {
            only_2_pins[1][0] = -1;
            only_2_pins[1][1] = -1;
            pinFull = 3;
        }
        document.getElementsByClassName(xclass)[0].innerHTML = "";
        click0(xclass);
    } else if (arr[x][y][0] == 1) {
        if (x == only_2_pins[0][0] && y == only_2_pins[0][1]) {
            only_2_pins[0][0] = -1;
            only_2_pins[0][1] = -1;
            pinFull = 3;
        } else if (x == only_2_pins[1][0] && y == only_2_pins[1][1]) {
            only_2_pins[1][0] = -1;
            only_2_pins[1][1] = -1;
            pinFull = 3;
        }
        document.getElementsByClassName(xclass)[0].innerHTML = "";
        click1(xclass);
    } else {
        var use = document.getElementsByClassName(xclass)[0];
        if (only_2_pins[0][0] == -1) {
            use.innerHTML = "src";
            only_2_pins[0][0] = x;
            only_2_pins[0][1] = y;
            click2(xclass);
        } else if (only_2_pins[1][0] == -1) {
            use.innerHTML = "dest";
            only_2_pins[1][0] = x;
            only_2_pins[1][1] = y;
            pinFull = 2;
            click2(xclass);
        }
    }
}

function click0(xclass) {
    document.getElementsByClassName(xclass)[0].style.background = "white";
}

function click1(xclass) {
    document.getElementsByClassName(xclass)[0].style.background = "#0b032d";
}

function click2(xclass) {
    document.getElementsByClassName(xclass)[0].style.background = "#B6CEC7";
}

function fiind() {
    if (only_2_pins[0][0] == -1 || only_2_pins[1][0] == -1) {
        console.log("select source & destination");
        return 0;
    } else if ((Math.abs(only_2_pins[0][0] - only_2_pins[1][0]) + Math.abs(only_2_pins[0][1] - only_2_pins[1][1])) == 1) {
        console.log("1");
        return 0;
    }
    // var currentBtn = [only_2_pins[0][0], only_2_pins[0][1]]
    // while (notFound) {

    // }
}