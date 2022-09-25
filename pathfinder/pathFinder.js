"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["blank"] = 0] = "blank";
    NodeType[NodeType["obstacle"] = 1] = "obstacle";
    NodeType[NodeType["endpoint"] = 2] = "endpoint";
})(NodeType || (NodeType = {}));
// nodes structure grid obj -> nodes array -> row array -> node obj
let rowSize = 7;
let columnSize = 5;
const nodes = [];
for (let rowNum = 0; rowNum < rowSize; rowNum++) {
    nodes.push([]);
    for (let columnNum = 0; columnNum < columnSize; columnNum++) {
        nodes[rowNum].push({
            x: columnNum,
            y: rowNum,
            visited: false,
            type: NodeType.blank
        });
        $("#grid").append("<button onclick='clicked(this.id)' id=" + rowNum + columnNum + ">.  .  .</button>");
    }
    $("#grid").append("<br>");
}
function clicked(id) {
    console.log(id);
}
