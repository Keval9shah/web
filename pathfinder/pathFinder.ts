interface Coordinates {
    x: number;
    y: number;
    exists?: boolean;
}

enum NodeType {
    blank = "blank",
    obstacle = "obstacle",
    step = "step",
    source = "source",
    destination = "destination",
    destinationFound = "destinationFound"
}

type Colors = {
    [key in NodeType] : string;
}

interface GridNode extends Coordinates {
    visited: boolean;
    color: string;
    type: NodeType;
}

const colors: Colors = {
    blank: "white",
    obstacle: "black",
    step: "#008000",
    source: "#b6cec7",
    destination: "#b6cec7",
    destinationFound: "#ffd700"
}

// nodes structure grid obj -> nodes array -> row array -> node obj
let rowSize = 0;
let columnSize = 0;
const nodes: GridNode[][] = [];
let source = {} as Coordinates;
let destination = {} as Coordinates;

constructGrid();

function constructGrid() {
    let newColumnSize = Math.floor((window.innerWidth - 132)/52);
    let newRowSize = Math.floor((window.innerHeight - 220)/52);
    let gridElement: JQuery<HTMLElement> = $("#grid");
    if(columnSize == newColumnSize && rowSize == newRowSize && $("#grid button").length != 0) { return; }
    !nodes[0] && gridElement.append("<button class='grid-node' onmousedown='clicked(this.id)' id = '0_0'></button>");
    for (let rowNum = 0; rowNum < newRowSize; rowNum++) {
        !nodes[rowNum] && nodes.push([]);
        for (let columnNum = 0; columnNum < newColumnSize; columnNum++) {
            if(nodes[rowNum][columnNum]) { continue; }
            nodes[rowNum].push({
                x: columnNum,
                y: rowNum,
                visited: false,
                get color() {
                    return colors[this.type as NodeType];
                },
                type: NodeType.blank
            });
            $("<button class='grid-node' onmousedown='clicked(this.id)' id =" + rowNum + "_" + columnNum + "></button>").insertAfter("#" + (columnNum == 0 ? rowNum - 1 : rowNum) + "_" + (columnNum == 0 ? newColumnSize - 1 : columnNum - 1));
        }
    }
    if(columnSize > newColumnSize || rowSize > newRowSize) {
        for (let rowNum = 0; rowNum < rowSize; rowNum++) {
            nodes[rowNum].splice(newColumnSize, columnSize);
            for (let columnNum = 0; columnNum < columnSize; columnNum++) {
                if(rowNum >= newRowSize || columnNum >= newColumnSize) {
                    $("#" + rowNum + "_" + columnNum).remove();
                }
            }
        }
        nodes.splice(newRowSize, rowSize);
    }
    columnSize = newColumnSize;
    rowSize = newRowSize;
    gridElement.css('width', columnSize * 52 );
    gridElement.css('grid-template-columns','repeat(' + columnSize + ', 52px)')
}

window.onresize = constructGrid;

function clicked(id: string) {
    let x: number, y: number;
    [x,y] = id.split("_").map(x => Number(x));
    let node: GridNode = nodes[x][y];
    if (node.type == NodeType.blank) {
        node.type = NodeType.obstacle;
    }
    else if (node.type == NodeType.obstacle) {
        node.type = NodeType.blank;
        if (!source.exists) {
            node.type = NodeType.source;
            source = { x, y, exists: true };
            $("#" + id).text("src");
        } else if (!destination.exists) {
            node.type = NodeType.destination;
            destination = { x, y, exists: true };
            $("#" + id).text("dest");
        }
    } else {
        $("#" + id).text("");
        node.type == NodeType.source ? (source.exists = false) : (destination.exists = false);
        node.type = NodeType.blank;
    }
    $("#" + id).css('background-color', node.color);
}

function find() {
    
}