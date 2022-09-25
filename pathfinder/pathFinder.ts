interface Coordinates {
    x: number;
    y: number;
}

enum NodeType {
    blank,
    obstacle,
    endpoint
}

interface GridNode extends Coordinates {
    visited: boolean;
    type: NodeType;
}

// nodes structure grid obj -> nodes array -> row array -> node obj
let rowSize = 7;
let columnSize = 5;
const nodes: GridNode[][] = [];

for (let rowNum = 0; rowNum < rowSize; rowNum++) {
    nodes.push([]);
    for (let columnNum = 0; columnNum < columnSize; columnNum++) {
        nodes[rowNum].push({
            x: columnNum,
            y: rowNum,
            visited: false,
            type: NodeType.blank
        });
        $("#grid").append("<button onclick='clicked(this.id)' id=" + rowNum + columnNum + ">.  .  .</button>")
    }
    $("#grid").append("<br>")
}

function clicked(id: string) {
    console.log(id);
}
