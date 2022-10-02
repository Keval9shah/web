interface Coordinates {
    x: number;
    y: number;
    exists?: boolean;
    gDist?: number;
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

interface Endpoint extends Coordinates {
    exists: boolean
}

interface GridNode extends Coordinates {
    visited: boolean;
    color: string;
    type: NodeType;
    hDist?: number;
    gDist: number;
    fDist?: number;
    parent?: Coordinates;
    successors?: Coordinates[]
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
let source = {} as Endpoint;
let destination = {} as Endpoint;

constructGrid();

function constructGrid() {
    let newColumnSize = Math.floor((window.innerWidth - 125)/52);
    let newRowSize = Math.floor((window.innerHeight - 220)/52);

    newColumnSize = (newColumnSize>0 && newColumnSize<35) ? newColumnSize : 0;
    newRowSize = (newRowSize>0 && newRowSize<35) ? newRowSize : 0;

    $(".grid-size").text(" ( " + newColumnSize + "x" + newRowSize + " ) ")
    let gridElement: JQuery<HTMLElement> = $("#grid");

    if(columnSize == newColumnSize && rowSize == newRowSize && $("#grid button").length != 0) { return; }
    (!nodes[0] && newColumnSize*newRowSize>0) && gridElement.append("<button class='grid-node' onclick='clicked(this.id)' id = '0_0'></button>");

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
                type: NodeType.blank,
                gDist: 0
            });
            $("<button class='grid-node' onclick='clicked(this.id)' id =" + rowNum + "_" + columnNum + "></button>").insertAfter("#" + (columnNum == 0 ? rowNum - 1 : rowNum) + "_" + (columnNum == 0 ? newColumnSize - 1 : columnNum - 1));
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

    [rowSize, columnSize] = [newRowSize, newColumnSize];
    
    (source.x >= columnSize || source.y >= rowSize) && (source.exists = false);
    (destination.x >= columnSize || destination.y >= rowSize) && (destination.exists = false);

    gridElement.css('width', columnSize * 52 );
    gridElement.css('grid-template-columns','repeat(' + columnSize + ', 52px)')
}

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

function findPath() {
    console.log("finding...")
}

function find() {

    if (!source.exists && !destination.exists) alert("source or destination is not selected");

    // 1.  Initialize the open list
    let openList: Set<GridNode> = new Set([]);

    // 2.  Initialize the closed list
    // put the starting node on the open 
    // list (you can leave its f at zero)
    let closedList: Set<GridNode> = new Set([]);
    openList.add(nodes[source.x][source.y]);

    // 3.  while the open list is not empty
    // a) find the node with the least f on 
    //    the open list, call it "q"
    let q: GridNode;
    while (openList.size!=0) {
        q = Array.from(openList).sort((a,b) => {
            return (<number>a.fDist - <number>b.fDist);
        })[0];

        // b) pop q off the open list
        openList.delete(q);

        // c) generate q's 8 successors and set their 
        // parents to q
        let qSuccessors: GridNode[] = getSuccessors(q);

        // d) for each successor
        // i) if successor is the goal, stop search
        qSuccessors.forEach(successor => {                //convert this to for loop
            if (successor.type == NodeType.destination) return;

            // ii) else, compute both g and h for successor
            // successor.g = q.g + distance between successor and q
            // successor.h = distance from goal to 
            // successor (This can be done using many 
            // ways, we will discuss three heuristics- 
            // Manhattan, Diagonal and Euclidean Heuristics)
            // successor.f = successor.g + successor.h
            let hDist = Math.abs(successor.x - destination.x) + Math.abs(successor.y - destination.y);  // Manhattan Distance
            let fDist = (<number>(<Coordinates>successor.parent).gDist + 1) + hDist;

            // iii) if a node with the same position as 
            // successor is in the OPEN list which has a 
            // lower f than successor, skip this successor
            if (Array.from(openList).find(o => o.x == successor.x && o.y == successor.y && <number>o.fDist < <number>successor.fDist)) {
                return;
            }
            
        })
        closedList.add(q);
    }
}

function getSuccessors(node: GridNode) {
    let successors: GridNode[] = [];
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
        let moveArr = [node.y + move[0], node.x + move[1]];
        
        if (moveArr[0] >= 0 && moveArr[0] < rowSize && moveArr[1] >= 0 && moveArr[1] < columnSize) {
            let successorNode = nodes[moveArr[0]][moveArr[1]];
            if (successorNode.type != NodeType.obstacle && successorNode.type != NodeType.source) {
                successorNode.parent = { x: node.x, y: node.y, gDist: node.gDist };
                successors.push(successorNode);
            }
        }
    });
    return successors;
}