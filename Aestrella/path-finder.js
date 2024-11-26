// const graph = require('./script.js')

const INF = 1e9;



function heuristic(node1, node2) {//TODO placeholder cambiar por la heuristica correcta
    return 0;//Math.sqrt(Math.pow(node1.latitud - node2.latitud, 2) + Math.pow(node1.longitud - node2.longitud, 2));
}

var rad = function (x) {
    return x * Math.PI / 180;
};

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


function calcDistance(x, y) {
    console.log(x, y);
    const d = getDistance(x, y);
    console.log("Desde ", x.estacion, " hasta ", y.estacion, " la distancia es => ", d);
    return d;
}



function Astar(startPoint, endPoint) {
    console.log("HOLA");

    const pq = new PriorityQueue({ comparator: (a, b) => a.w - b.w }); //w es la distancia mas cercana -> orden de prioridad
    const visited = new Set();
    const distance = new Map();
    const parents = new Map();

    pq.queue(
        { node: startPoint, w: heuristic(startPoint, endPoint) } //node : string 
    );// se encola el objeto del nodo desde donde viene y el peso acumulado

    distance.set(startPoint, 0)
    parents.set(startPoint, null);


    while (pq.length != 0 && pq.peek().node !== endPoint) {
        //desencola y aÃ±ade al path 
        const currentNode = pq.dequeue().node;

        if (visited.has(currentNode)) continue; //si ha sido visitado continua a la sigiente iteracion. 
        visited.add(currentNode);

        //accede al grafo para ver que nodos son adyacentes y los encola
        console.log("node: ", currentNode);
        const adjacentList = graph.get(currentNode);

        console.log("adjacentList: ", adjacentList);

        adjacentList.forEach((node) => {
            const v = node.id;
            const u = currentNode;


            const origin=estaciones.find(estacion => estacion.id == u);
            const dest=estaciones.find(estacion => estacion.id == v);
            
            const w = calcDistance(origin, dest) + heuristic(origin, dest);

            if (!distance.has(v)) distance.set(v, INF);

            if (distance.get(u) + w < distance.get(v)) {
                distance.set(v, distance.get(u) + w);
                pq.queue({ node: v, w: distance.get(v) });
                parents.set(v, u);
                console.log("reduced",v);
            }
        });
    }
    console.log(distance);
    console.log(parents);
    let path = [];
    let currentNode = endPoint;

    while (currentNode !== null && currentNode !== undefined) {
        path.unshift(currentNode);
        currentNode = parents.get(currentNode);
    }
    console.log("path: " + path);
    return path;
}