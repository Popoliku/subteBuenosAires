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
    return calcDistance(currentNode, endNode);
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

const vel = {
    "A":28.17391304,
    "B":30.7826087,
    "C":20.30769231,
    "D": 24.46153846,
    "E":29.75
}

//Debug function
function calcDistance(x, y) {
    var d = getDistance(x, y);
    return d;
}

function getMinutes(x,y){
    var d = getDistance(x, y);
    const minutos = ((d) / (vel[x.linea] * (1000 / 3600))) / 60;
    return minutos;
}

/**
 * 
 * @param {*} startPoint nodo de partida
 * @param {*} endPoint    nodo meta
 * @returns debuelve el camino minimo entre startPoint y endPoint en una lista de strings empezando por la izquierda hasta la derecha
 */
function Astar(startPoint, endPoint) {

    const pq = new PriorityQueue({ comparator: (a, b) => b.w - a.w }); //w es la distancia mas cercana -> orden de prioridad
    const visited = new Set();
    const minutes = new Map();
    const parents = new Map();

    pq.queue(
        { node: startPoint, w: 0 + heuristic(startPoint, endPoint) } //node : string 
    );

    minutes.set(startPoint, 0)
    parents.set(startPoint, null);

    const endStation = estaciones.find(estacion => estacion.id == endPoint);

    while (pq.length != 0 && pq.peek().node !== endPoint) {
        //desencola y anade al path 
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
            
            const w = getMinutes(origin, dest);

            if (!minutes.has(v)) minutes.set(v, INF);

            if (minutes.get(u) + w < minutes.get(v)) {
                minutes.set(v, minutes.get(u) + w);
                pq.queue({ node: v, w: minutes.get(v) + heuristic(origin, endStation) }); //f(n) = g(n) + h(n)
                parents.set(v, u);
            }
        });
    }
    
    //genera el camino minimo en path
    let path = [];
    let currentNode = endPoint;

    while (currentNode !== null && currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = parents.get(currentNode);
    }

    return path;
}

