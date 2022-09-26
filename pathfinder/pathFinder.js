"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["blank"] = 0] = "blank";
    NodeType[NodeType["obstacle"] = 1] = "obstacle";
    NodeType[NodeType["endpoint"] = 2] = "endpoint";
    NodeType[NodeType["destinationFound"] = 3] = "destinationFound";
})(NodeType || (NodeType = {}));
const colors = ["white", "black", "#b6cec7", "#ffd700"];
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
                $("#grid").append("<button class='grid-node' onclick='clicked(this.id)' id=" + rowNum + "_" + columnNum + "></button>");
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
    $("#grid").css('width', columnSize * 52);
}
window.onresize = constructGrid;
function clicked(id) {
    let x, y;
    [x, y] = id.split("_");
    x = Number(x);
    y = Number(y);
    let currentNode = nodes[x][y];
    (currentNode.type != NodeType.destinationFound) && (currentNode.type = (currentNode.type + 1) % 3);
    if (currentNode.type == NodeType.endpoint && !source.x) {
        source = { x, y };
        $("#" + id).text("src");
    }
    else if (currentNode.type == NodeType.endpoint && !destination.x) {
        destination = { x, y };
        $("#" + id).text("dest");
    }
    else if (currentNode.type == NodeType.endpoint) {
        currentNode.type = NodeType.blank;
    }
    $("#" + id).css('background-color', currentNode.color);
}
