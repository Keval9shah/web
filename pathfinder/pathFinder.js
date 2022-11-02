"use strict";
var NodeType;
(function (NodeType) {
    NodeType["blank"] = "blank";
    NodeType["obstacle"] = "obstacle";
    NodeType["step"] = "step";
    NodeType["source"] = "source";
    NodeType["destination"] = "destination";
    NodeType["destinationFound"] = "destinationFound";
})(NodeType || (NodeType = {}));
const colors = {
    blank: "white",
    obstacle: "black",
    step: "#008000",
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
let newColumnSize = Math.floor((window.innerWidth - 125) / 52);
let newRowSize = Math.floor((window.innerHeight - 220) / 52);
constructGrid(newColumnSize, newRowSize);
function constructGrid(newColumnSize, newRowSize) {
    newColumnSize = (newColumnSize > 0 && newColumnSize < 35) ? newColumnSize : 0;
    newRowSize = (newRowSize > 0 && newRowSize < 35) ? newRowSize : 0;
    $(".grid-size").text(" ( " + newColumnSize + "x" + newRowSize + " ) ");
    let gridElement = $("#grid");
    if (columnSize == newColumnSize && rowSize == newRowSize && $("#grid button").length != 0) {
        return;
    }
    (!nodes[0] && newColumnSize * newRowSize > 0) && gridElement.append("<button class='grid-node' onclick='clicked(this.id)' id = '0_0'></button>");
    for (let rowNum = 0; rowNum < newRowSize; rowNum++) {
        !nodes[rowNum] && nodes.push([]);
        for (let columnNum = 0; columnNum < newColumnSize; columnNum++) {
            if (nodes[rowNum][columnNum]) {
                continue;
            }
            nodes[rowNum].push({
                x: columnNum,
                y: rowNum,
                get color() {
                    return colors[this.type];
                },
                fDist: Math.max(),
                type: NodeType.blank,
                gDist: 0
            });
            $("<button class='grid-node' onclick='clicked(this.id)' id =" + rowNum + "_" + columnNum + "></button>").insertAfter("#" + (columnNum == 0 ? rowNum - 1 : rowNum) + "_" + (columnNum == 0 ? newColumnSize - 1 : columnNum - 1));
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
    [rowSize, columnSize] = [newRowSize, newColumnSize];
    (source.x >= columnSize || source.y >= rowSize) && (source.exists = false);
    (destination.x >= columnSize || destination.y >= rowSize) && (destination.exists = false);
    gridElement.css('width', columnSize * 52);
    gridElement.css('grid-template-columns', 'repeat(' + columnSize + ', 52px)');
}
function constructCustomGrid(resizeToScreen) {
    let sizeX = parseInt($("#sizeX")[0].value);
    let sizeY = parseInt($("#sizeY")[0].value);
    if (!sizeX || !sizeY || resizeToScreen) {
        let newColumnSize = Math.floor((window.innerWidth - 125) / 52);
        let newRowSize = Math.floor((window.innerHeight - 220) / 52);
        constructGrid(newColumnSize, newRowSize);
    }
    else {
        constructGrid(sizeX, sizeY);
    }
}
function clicked(id) {
    let x, y;
    [x, y] = id.split("_").map(x => Number(x));
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
function findPath() {
    console.log("finding...");
    find();
    console.log("found");
}
function find() {
    if (!source.exists || !destination.exists) {
        alert("source or destination is not selected");
        return;
    }
    // 1.  Initialize the open list
    let openList = new Set([]);
    // 2.  Initialize the closed list
    // put the starting node on the open 
    // list (you can leave its f at zero)
    let closedList = new Set([]);
    openList.add(nodes[source.x][source.y]);
    // 3.  while the open list is not empty
    // a) find the node with the least f on 
    //    the open list, call it "q"
    let q;
    while (openList.size != 0) {
        q = Array.from(openList).sort((a, b) => {
            return (a.fDist - b.fDist);
        })[0];
        console.log(q);
        // b) pop q off the open list
        openList.delete(q);
        // c) generate q's 8 successors and set their 
        // parents to q
        let qSuccessors = getSuccessors(q);
        // d) for each successor
        for (let successorIndex = 0; successorIndex < qSuccessors.length; successorIndex++) {
            let successor = qSuccessors[successorIndex];
            $("#" + successor.x + "_" + successor.y).css('background-color', "red");
            // i) if successor is the goal, stop search
            console.log(successor.type, NodeType.destination);
            if (successor.type == NodeType.destination) {
                return;
            }
            // ii) else, compute both g and h for successor
            // successor.g = q.g + distance between successor and q
            // successor.h = distance from goal to 
            // successor (This can be done using many 
            // ways, we will discuss three heuristics- 
            // Manhattan, Diagonal and Euclidean Heuristics)
            // successor.f = successor.g + successor.h
            successor.hDist = Math.abs(successor.x - destination.x) + Math.abs(successor.y - destination.y); // Manhattan Distance
            successor.fDist = (successor.parent.gDist + 1) + successor.hDist;
            // iii) if a node with the same position as 
            // successor is in the OPEN list which has a 
            // lower f than successor, skip this successor
            if (Array.from(openList).find(o => o.fDist < successor.fDist)) {
                continue;
            }
            // iV) if a node with the same position as 
            // successor is in the CLOSED list which has
            // a lower f than successor, skip this successor
            // otherwise, add  the node to the open list
            if (Array.from(closedList).find(c => c.fDist < successor.fDist)) {
                continue;
            }
            else {
                openList.add(successor);
            }
            // end (for loop)
            // console.log(openList, closedList);
            // console.log("hii");
        }
        closedList.add(q);
        $("#" + q.y + "_" + q.x).css('background-color', "green");
    }
}
function getSuccessors(node) {
    let successors = [];
    // possible moves (first four cross-moves)
    [
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 1],
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1]
    ].forEach(move => {
        let newPosition = [node.y + move[0], node.x + move[1]];
        if (newPosition[0] >= 0 && newPosition[0] < rowSize && newPosition[1] >= 0 && newPosition[1] < columnSize) {
            let successorNode = nodes[newPosition[0]][newPosition[1]];
            if (successorNode.type != NodeType.obstacle && successorNode.type != NodeType.source) {
                successorNode.parent = { x: node.x, y: node.y, gDist: node.gDist };
                successors.push(successorNode);
            }
        }
    });
    return successors;
}
