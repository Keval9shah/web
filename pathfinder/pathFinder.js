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
let rowSize = 7;
let columnSize = 12;
const nodes = [];
constructGrid();
function constructGrid() {
    let newColumnSize = Math.floor((window.innerWidth - 110) / 52);
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
    $("#" + id).css('background-color', 'black');
}
