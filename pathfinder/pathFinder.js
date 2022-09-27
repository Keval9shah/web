"use strict";
var NodeType;
(function (NodeType) {
    NodeType["blank"] = "blank";
    NodeType["obstacle"] = "obstacle";
    NodeType["source"] = "source";
    NodeType["destination"] = "destination";
    NodeType["destinationFound"] = "destinationFound";
})(NodeType || (NodeType = {}));
const colors = {
    blank: "white",
    obstacle: "black",
    source: "#b6cec7",
    destination: "#b6cec7",
    destinationFound: "#ffd700"
};
// nodes structure grid obj -> nodes array -> row array -> node obj
let rowSize = 0;
let columnSize = 0;
const nodes = [];
let source = {};
let destination = {};
constructGrid();
function constructGrid() {
    let newColumnSize = Math.floor((window.innerWidth - 132) / 52);
    let newRowSize = Math.floor((window.innerHeight - 220) / 52);
    let gridElement = $("#grid");
    if (columnSize == newColumnSize && rowSize == newRowSize && $("#grid button").length != 0) {
        return;
    }
    for (let rowNum = 0; rowNum < newRowSize; rowNum++) {
        !nodes[rowNum] && nodes.push([]);
        for (let columnNum = 0; columnNum < newColumnSize; columnNum++) {
            if (nodes[rowNum][columnNum]) {
                continue;
            }
            nodes[rowNum].push({
                x: columnNum,
                y: rowNum,
                visited: false,
                get color() {
                    return colors[this.type];
                },
                type: NodeType.blank
            });
            if ($("#grid button").length == 0) {
                gridElement.append("<button class='grid-node' onclick='clicked(this.id)' id=" + rowNum + "_" + columnNum + "></button>");
            }
            else {
                $("<button class='grid-node' onclick='clicked(this.id)' id=" + rowNum + "_" + columnNum + "></button>").insertAfter("#" + (columnNum == 0 ? rowNum - 1 : rowNum) + "_" + (columnNum == 0 ? newColumnSize - 1 : columnNum - 1));
            }
        }
    }
    if (columnSize > newColumnSize || rowSize > newRowSize) {
        for (let rowNum = 0; rowNum < rowSize; rowNum++) {
            nodes[rowNum].splice(newColumnSize, columnSize);
            for (let columnNum = 0; columnNum < columnSize; columnNum++) {
                if (rowNum >= newRowSize || columnNum >= newColumnSize) {
                    $("#" + rowNum + "_" + columnNum).remove();
                }
            }
        }
        nodes.splice(newRowSize, rowSize);
    }
    columnSize = newColumnSize;
    rowSize = newRowSize;
    gridElement.css('width', columnSize * 52);
    gridElement.css('grid-template-columns', 'repeat(' + columnSize + ', 52px)');
}
window.onresize = constructGrid;
function clicked(id) {
    let x, y;
    [x, y] = id.split("_");
    x = Number(x);
    y = Number(y);
    let node = nodes[x][y];
    if (node.type == NodeType.blank) {
        node.type = NodeType.obstacle;
    }
    else if (node.type == NodeType.obstacle) {
        node.type = NodeType.blank;
        if (!source.exists) {
            node.type = NodeType.source;
            source = { x, y, exists: true };
            $("#" + id).text("src");
        }
        else if (!destination.exists) {
            node.type = NodeType.destination;
            destination = { x, y, exists: true };
            $("#" + id).text("dest");
        }
    }
    else {
        $("#" + id).text("");
        node.type == NodeType.source ? (source.exists = false) : (destination.exists = false);
        node.type = NodeType.blank;
    }
    $("#" + id).css('background-color', node.color);
}
