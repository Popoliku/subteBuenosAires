const PQ = require('priorityqueuejs');


const INF=1e9;

const graph = {
    "CATEDRAL": ["9 DE JULIO"],
    "9 DE JULIO": ["CATEDRAL", "TRIBUNALES"],
    "TRIBUNALES": ["9 DE JULIO", "CALLAO", "CARLOS PELLEGRINI", "DIAGONAL NORTE"],
    "CALLAO": ["TRIBUNALES", "FACULTAD DE MEDICINA"],
    "FACULTAD DE MEDICINA": ["CALLAO"]
};


function heuristic(node1, node2){//TODO placeholder cambiar por la heuristica correcta
    return 0;//Math.sqrt(Math.pow(node1.latitud - node2.latitud, 2) + Math.pow(node1.longitud - node2.longitud, 2));
}

function calcDistance(x,y){
    return x + y;
}

function getDistance(startPoint, endPoint){
    const queue = new PQ((a, b) => a.w - b.w); //w es el peso

    const visited = new Set();

    const distance = new Map();
    queue.enq(
        { node: startPoint, w: 0 } //node : string 
    );// se encola el objeto del nodo desde donde viene y el peso acumulado

    distance.set(startPoint,0)
    
    let parents = {
        [startPoint]: null
    }
    
    while(!queue.isEmpty() && queue.peek().node !== endPoint){
        //desencola y añade al path 
        const currentNode = queue.deq();
        if(visited.has(currentNode.node)) continue; //si ha sido visitado continua a la sigiente iteracion. 
        visited.add(currentNode.node);
        
        //accede al grafo para ver que nodos son adyacentes y los encola
        const adjacentList = graph[currentNode.node];
        console.log("adj: " + adjacentList);

        adjacentList.forEach( (node) =>{
            const v = node;
            const u = currentNode.node;
            const w = calcDistance(4,5);

            
            if(!distance.has(v)) distance.set(v,INF);

            if(distance.get(u) + w < distance.get(v)){
                distance.set(v,distance.get(u) + w);
                queue.enq({node: v, w: distance.get(v)});
                parents[v]=u;
            }
        });
    }
    console.log(distance);
    let path = [];
    let currentNode = endPoint;

    while (currentNode !== null && currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = parents[currentNode];
    }
    console.log(path);
}

getDistance("CALLAO", "CATEDRAL");