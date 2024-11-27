// const graph = require('./script.js')

const INF = 1e9;

var rad = function (x) {
    return x * Math.PI / 180;
};

/**
 * 
 * @param {*} currentNode nodo en el que se encuentra el algoritmo en ese momento
 * @param {*} endNode meta o destino
 * @returns el valor de retorno es la distancia aerea entre currentNode y endNode 
 */
function heuristic(currentNode, endNode){
    return getDistance(currentNode, endNode);
}

/**
 * 
 * @param {*} p1 punto1
 * @param {*} p2 punto2
 * @returns la distancia entre p1 y p2 teniendo en cuenta la curbatura de la tierra
 */
var getDistance = function (p1, p2) {
    var R = 6378137;
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.long - p1.long);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

//Debug function
function calcDistance(x, y) {
    console.log(x, y);
    const d = getDistance(x, y);
    console.log("Desde ", x.estacion, " hasta ", y.estacion, " la distancia es => ", d);
    return d;
}


/**
 * 
 * @param {*} startPoint nodo de partida
 * @param {*} endPoint    nodo meta
 * @returns debuelve el camino minimo entre startPoint y endPoint en una lista de strings empezando por la izquierda hasta la derecha
 */
function Astar(startPoint, endPoint) {

    const pq = new PriorityQueue({ comparator: (a, b) => a.w - b.w }); //w es la distancia mas cercana -> orden de prioridad
    const visited = new Set();
    const distance = new Map();
    const parents = new Map();

    pq.queue(
        { node: startPoint, w: heuristic(startPoint, endPoint) } //node : string 
    );

    distance.set(startPoint, 0)
    parents.set(startPoint, null);


    while (pq.length != 0 && pq.peek().node !== endPoint) {
        //desencola y aÃ±ade al path 
        const currentNode = pq.dequeue().node;

        if (visited.has(currentNode)) continue; //si ha sido visitado continua a la sigiente iteracion. 
        visited.add(currentNode);

        //accede al grafo para ver que nodos son adyacentes y los encola
        const adjacentList = graph.get(currentNode);

        adjacentList.forEach((node) => {
            const v = node.id;
            const u = currentNode;


            const origin=estaciones.find(estacion => estacion.id == u);
            const dest=estaciones.find(estacion => estacion.id == v);
            
            const w = getDistance(origin, dest) + heuristic(origin, endPoint);

            if (!distance.has(v)) distance.set(v, INF);

            if (distance.get(u) + w < distance.get(v)) {
                distance.set(v, distance.get(u) + w);
                pq.queue({ node: v, w: distance.get(v) });
                parents.set(v, u);
            }
        });
    }//genera el camino minimo en path
    let path = [];
    let currentNode = endPoint;

    while (currentNode !== null && currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = parents.get(currentNode);
    }
    return path;
}

