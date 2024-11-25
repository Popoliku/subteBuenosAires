

document.getElementById("findPathBtn").addEventListener("click", () => {
    const startStation = document.getElementById("start").value.trim();
    const endStation = document.getElementById("end").value.trim();

    if (!startStation && !endStation) {
        document.getElementById("result").innerText = "Introduzca el trayecto";
        return;
    }

    if (!startStation) {
        document.getElementById("result").innerText = "Introduzca estación de inicio";
        return;
    }
    if (!endStation) {
        document.getElementById("result").innerText = "Introduzca estación de llegada";
        return;
    }

    let a = estaciones.find(estacion => estacion.estacion.toLowerCase() == startStation.toLowerCase());
    let b = estaciones.find(estacion => estacion.estacion.toLowerCase() == endStation.toLowerCase());
    let c = startStation.toLowerCase() == "callao (línea b)";
    let d = startStation.toLowerCase() == "callao (línea d)";
    let e = startStation.toLowerCase() == "independencia (línea c)";
    let f = startStation.toLowerCase() == "independencia (línea e)";
    let g = endStation.toLowerCase() == "callao (línea b)";
    let h = endStation.toLowerCase() == "callao (línea d)";
    let i = endStation.toLowerCase() == "independencia (línea c)";
    let j = endStation.toLowerCase() == "independencia (línea e)";
    let k = c || d || e || f || g || h || i || j;

    if(!a && !b && !k){
        document.getElementById("result").innerText = "Estaciones de inicio y destino inválidos";
        return;
    }
    if(!a && !k){
        document.getElementById("result").innerText = "Estación de inicio inválido";
        return;
    }
    if(!b && !k){
        document.getElementById("result").innerText = "Estación de destino inválido";
        return;
    }


    const load = document.getElementById("loading");

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    load.classList.remove("hidden");

    sleep(1000).then(() => {
        load.classList.add("hidden");


        const mockPath = `Camino óptimo desde ${startStation} a ${endStation} es:.`;

        document.getElementById("result").innerText = mockPath;

        //A*

        /*

Start             End
        A             B
        |             |
        |             |
        |             |
        |             |
        |             |
        |             |
        C             D


        */

        const pq = new PriorityQueue({ comparator: (a, b) => a - b });
        pq.queue(5);
        pq.queue(1);
        pq.queue(3);

        console.log(pq.dequeue()); // 1
        console.log(pq.dequeue()); // 3



    });



});

console.log("Script loaded");


//MAPA
const map = L.map('map').setView([-34.6083, -58.38], 13); // Inicializar en Buenos Aires 

//Anadir el mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
    updateWhenIdle: true
}).addTo(map);


map.setMinZoom(12); // Prevent excessive zooming out
map.setMaxZoom(18); // Prevent excessive zooming in

map.on('click', function (e) {
    console.log(`clicked on ${e.latlng}`);
});


const estaciones = [
    { "long": -58.373955807, "lat": -34.6078023364, "id": 1.0, "estacion": "CATEDRAL", "linea": "D" },
    { "long": -58.3805743429, "lat": -34.604245203, "id": 2.0, "estacion": "9 DE JULIO", "linea": "D" },
    { "long": -58.3851423588, "lat": -34.6015871651, "id": 3.0, "estacion": "TRIBUNALES", "linea": "D" },
    { "long": -58.393125181, "lat": -34.5996395524, "id": 4.0, "estacion": "CALLAO", "linea": "D" },
    { "long": -58.3979237556, "lat": -34.5997570808, "id": 5.0, "estacion": "FACULTAD DE MEDICINA", "linea": "D" },
    { "long": -58.3699298501, "lat": -34.6029894966, "id": 6.0, "estacion": "LEANDRO N. ALEM", "linea": "B" },
    { "long": -58.3750715183, "lat": -34.6032972856, "id": 7.0, "estacion": "FLORIDA", "linea": "B" },
    { "long": -58.3807148471, "lat": -34.6036371052, "id": 8.0, "estacion": "CARLOS PELLEGRINI", "linea": "B" },
    { "long": -58.3872961335, "lat": -34.6040935531, "id": 9.0, "estacion": "URUGUAY", "linea": "B" },
    { "long": -58.3923142351, "lat": -34.6044195429, "id": 10.0, "estacion": "CALLAO", "linea": "B" },
    { "long": -58.3994742567, "lat": -34.6046429679, "id": 11.0, "estacion": "PASTEUR", "linea": "B" },
    { "long": -58.370968499, "lat": -34.6088103092, "id": 12.0, "estacion": "PLAZA DE MAYO", "linea": "A" },
    { "long": -58.3742677264, "lat": -34.6085590739, "id": 13.0, "estacion": "PERÚ", "linea": "A" },
    { "long": -58.3790851531, "lat": -34.6088817212, "id": 14.0, "estacion": "PIEDRAS", "linea": "A" },
    { "long": -58.382232401, "lat": -34.6090998066, "id": 15.0, "estacion": "LIMA", "linea": "A" },
    { "long": -58.3867771941, "lat": -34.6094125865, "id": 16.0, "estacion": "SAENZ PE\u00d1A", "linea": "A" },
    { "long": -58.3926688247, "lat": -34.6092256843, "id": 17.0, "estacion": "CONGRESO", "linea": "A" },
    { "long": -58.3984269918, "lat": -34.6096459617, "id": 18.0, "estacion": "PASCO", "linea": "A" },
    { "long": -58.4012075342, "lat": -34.6098335784, "id": 19.0, "estacion": "ALBERTI", "linea": "A" },
    { "long": -58.3740182165, "lat": -34.5911938083, "id": 20.0, "estacion": "RETIRO", "linea": "C" },
    { "long": -58.377819051, "lat": -34.5950574048, "id": 21.0, "estacion": "SAN MARTIN", "linea": "C" },
    { "long": -58.3781557828, "lat": -34.601769923, "id": 22.0, "estacion": "LAVALLE", "linea": "C" },
    { "long": -58.3795299801, "lat": -34.6048437399, "id": 23.0, "estacion": "DIAGONAL NORTE", "linea": "C" },
    { "long": -58.380610718, "lat": -34.6089833149, "id": 24.0, "estacion": "AVENIDA DE MAYO", "linea": "C" },
    { "long": -58.3804444697, "lat": -34.6126172798, "id": 25.0, "estacion": "MORENO", "linea": "C" },
    { "long": -58.3801736105, "lat": -34.6181255993, "id": 26.0, "estacion": "INDEPENDENCIA", "linea": "C" },
    { "long": -58.3799211789, "lat": -34.6219167322, "id": 27.0, "estacion": "SAN JUAN", "linea": "C" },
    { "long": -58.3814344339, "lat": -34.6276194523, "id": 28.0, "estacion": "CONSTITUCION", "linea": "C" },
    { "long": -58.3736842242, "lat": -34.6092424289, "id": 29.0, "estacion": "BOLIVAR", "linea": "E" },
    { "long": -58.3775808865, "lat": -34.6128491058, "id": 30.0, "estacion": "BELGRANO", "linea": "E" },
    { "long": -58.3815349417, "lat": -34.617937394, "id": 31.0, "estacion": "INDEPENDENCIA", "linea": "E" },
    { "long": -58.3851485496, "lat": -34.6223394919, "id": 32.0, "estacion": "SAN JOSE", "linea": "E" },
    { "long": -58.3915117, "lat": -34.6227196661, "id": 33.0, "estacion": "ENTRE RÍOS", "linea": "E" },
    { "long": -58.3970680747, "lat": -34.6231098658, "id": 34.0, "estacion": "PICHINCHA", "linea": "E" },
];

const lineaD = [
    { "long": -58.373955807, "lat": -34.6078023364, "id": 1.0, "estacion": "CATEDRAL", "linea": "D" },
    { "long": -58.3805743429, "lat": -34.604245203, "id": 2.0, "estacion": "9 DE JULIO", "linea": "D" },
    { "long": -58.3851423588, "lat": -34.6015871651, "id": 3.0, "estacion": "TRIBUNALES", "linea": "D" },
    { "long": -58.393125181, "lat": -34.5996395524, "id": 4.0, "estacion": "CALLAO", "linea": "D" },
    { "long": -58.3979237556, "lat": -34.5997570808, "id": 5.0, "estacion": "FACULTAD DE MEDICINA", "linea": "D" },
];

const lineaB = [
    { "long": -58.3699298501, "lat": -34.6029894966, "id": 6.0, "estacion": "LEANDRO N. ALEM", "linea": "B" },
    { "long": -58.3750715183, "lat": -34.6032972856, "id": 7.0, "estacion": "FLORIDA", "linea": "B" },
    { "long": -58.3807148471, "lat": -34.6036371052, "id": 8.0, "estacion": "CARLOS PELLEGRINI", "linea": "B" },
    { "long": -58.3872961335, "lat": -34.6040935531, "id": 9.0, "estacion": "URUGUAY", "linea": "B" },
    { "long": -58.3923142351, "lat": -34.6044195429, "id": 10.0, "estacion": "CALLAO", "linea": "B" },
    { "long": -58.3994742567, "lat": -34.6046429679, "id": 11.0, "estacion": "PASTEUR", "linea": "B" },
];

const lineaA = [
    { "long": -58.370968499, "lat": -34.6088103092, "id": 12.0, "estacion": "PLAZA DE MAYO", "linea": "A" },
    { "long": -58.3742677264, "lat": -34.6085590739, "id": 13.0, "estacion": "PERÚ", "linea": "A" },
    { "long": -58.3790851531, "lat": -34.6088817212, "id": 14.0, "estacion": "PIEDRAS", "linea": "A" },
    { "long": -58.382232401, "lat": -34.6090998066, "id": 15.0, "estacion": "LIMA", "linea": "A" },
    { "long": -58.3867771941, "lat": -34.6094125865, "id": 16.0, "estacion": "SAENZ PE\u00d1A", "linea": "A" },
    { "long": -58.3926688247, "lat": -34.6092256843, "id": 17.0, "estacion": "CONGRESO", "linea": "A" },
    { "long": -58.3984269918, "lat": -34.6096459617, "id": 18.0, "estacion": "PASCO", "linea": "A" },
    { "long": -58.4012075342, "lat": -34.6098335784, "id": 19.0, "estacion": "ALBERTI", "linea": "A" },
];

const lineaC = [
    { "long": -58.3740182165, "lat": -34.5911938083, "id": 20.0, "estacion": "RETIRO", "linea": "C" },
    { "long": -58.377819051, "lat": -34.5950574048, "id": 21.0, "estacion": "SAN MARTIN", "linea": "C" },
    { "long": -58.3781557828, "lat": -34.601769923, "id": 22.0, "estacion": "LAVALLE", "linea": "C" },
    { "long": -58.3795299801, "lat": -34.6048437399, "id": 23.0, "estacion": "DIAGONAL NORTE", "linea": "C" },
    { "long": -58.380610718, "lat": -34.6089833149, "id": 24.0, "estacion": "AV. DE MAYO", "linea": "C" },
    { "long": -58.3804444697, "lat": -34.6126172798, "id": 25.0, "estacion": "MORENO", "linea": "C" },
    { "long": -58.3801736105, "lat": -34.6181255993, "id": 26.0, "estacion": "INDEPENDENCIA", "linea": "C" },
    { "long": -58.3799211789, "lat": -34.6219167322, "id": 27.0, "estacion": "SAN JUAN", "linea": "C" },
    { "long": -58.3814344339, "lat": -34.6276194523, "id": 28.0, "estacion": "CONSTITUCION", "linea": "C" },
];

const lineaE = [
    { "long": -58.3736842242, "lat": -34.6092424289, "id": 29.0, "estacion": "BOLIVAR", "linea": "E" },
    { "long": -58.3775808865, "lat": -34.6128491058, "id": 30.0, "estacion": "BELGRANO", "linea": "E" },
    { "long": -58.3815349417, "lat": -34.617937394, "id": 31.0, "estacion": "INDEPENDENCIA", "linea": "E" },
    { "long": -58.3851485496, "lat": -34.6223394919, "id": 32.0, "estacion": "SAN JOSE", "linea": "E" },
    { "long": -58.3915117, "lat": -34.6227196661, "id": 33.0, "estacion": "ENTRE RÍOS", "linea": "E" },
    { "long": -58.3970680747, "lat": -34.6231098658, "id": 34.0, "estacion": "PICHINCHA", "linea": "E" },
];

//Circulo rojo para estacion
const customDivIconD = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: green; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});

const customDivIconB = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: red; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});

const customDivIconA = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: lightblue; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});

const customDivIconC = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: blue; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});

const customDivIconE = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: purple; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});



lineaD.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIconD }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada    
});

lineaB.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIconB }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada    
    
});

lineaA.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIconA }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada    
});

lineaC.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIconC }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada    
});

lineaE.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIconE }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada    
});


//Seleccionar punto partida en mapa

const inputField1 = document.getElementById("end");
const inputField2 = document.getElementById("start");

// Separate marker groups
let startMarkers = [];
let endMarkers = [];

// Add event listeners
inputField1.addEventListener('input', () => handler(inputField1, endMarkers));
inputField2.addEventListener('input', () => handler(inputField2, startMarkers));

function handler(inputField, markerGroup) {
    console.log(`Input changed for: ${inputField.id}`);

    // Clear markers only for this input
    markerGroup.forEach(marker => map.removeLayer(marker));
    markerGroup.length = 0; // Clear the marker group array

    const inputValue = inputField.value.trim().toLowerCase(); // Normalize input value
    if (!inputValue) {
        console.log("Input field is empty, no action taken.");
        return;
    }




    // Find matching station
    let matchedStation = estaciones.find(estacion =>
        estacion.estacion.toLowerCase() === inputValue
    );
    if (inputValue === 'callao (línea d)') {
        matchedStation = estaciones.find(estacion =>
            estacion.id == 4);
    } else if (inputValue == 'callao (línea b)') {
        matchedStation = estaciones.find(estacion =>
            estacion.id == 10);
    } else if (inputValue === 'independencia (línea c)') {
        matchedStation = estaciones.find(estacion =>
            estacion.id == 26);
    } else if (inputValue == 'independencia (línea e)') {
        matchedStation = estaciones.find(estacion =>
            estacion.id == 31);
    }
    console.log(matchedStation);
    if (matchedStation) {
        console.log(`Station found: ${matchedStation.estacion} con id ${matchedStation.id} `);
        const selected = L.divIcon({
            className: 'custom-div-icon marker-grow',
            html: `<div class="marker-grow animate-grow" style="
            width: 40px; 
            height: 40px; 
            background-image: url('llegada.png'); 
            background-size: cover; 
            background-position: center top; 
            filter: hue-rotate(0deg) saturate(100%) brightness(0.8) sepia(1) saturate(500%) hue-rotate(-50deg);
        "></div>`, iconSize: [40, 70]
        });


        // Add marker for the matched station
        const marker = L.marker([matchedStation.lat, matchedStation.long], { icon: selected, zIndexOffset: 1000 })
            .addTo(map)
            .bindPopup(`<b>${matchedStation.estacion}</b><br>Linea: ${matchedStation.linea}`);

        markerGroup.push(marker); // Add to the correct marker group
    } else {
        console.log("No matching station found.");
    }
}




const routeD = [
    [estaciones[0].lat, estaciones[0].long],
    [estaciones[1].lat, estaciones[1].long],
    [estaciones[2].lat, estaciones[2].long],
    [estaciones[3].lat, estaciones[3].long],
    [estaciones[4].lat, estaciones[4].long],
];

L.polyline(routeD, { color: 'green', weight: 5 }).addTo(map);

const routeB = [
    [estaciones[5].lat, estaciones[5].long],
    [estaciones[6].lat, estaciones[6].long],
    [estaciones[7].lat, estaciones[7].long],
    [estaciones[8].lat, estaciones[8].long],
    [estaciones[9].lat, estaciones[9].long],
    [estaciones[10].lat, estaciones[10].long],
];

L.polyline(routeB, { color: 'red', weight: 5 }).addTo(map);

const routeA = [
    [estaciones[11].lat, estaciones[11].long],
    [estaciones[12].lat, estaciones[12].long],
    [estaciones[13].lat, estaciones[13].long],
    [estaciones[14].lat, estaciones[14].long],
    [estaciones[15].lat, estaciones[15].long],
    [estaciones[16].lat, estaciones[16].long],
    [estaciones[17].lat, estaciones[17].long],
    [estaciones[18].lat, estaciones[18].long],
];

L.polyline(routeA, { color: 'lightblue', weight: 5 }).addTo(map);

const routeC = [
    [estaciones[19].lat, estaciones[19].long],
    [estaciones[20].lat, estaciones[20].long],
    [estaciones[21].lat, estaciones[21].long],
    [estaciones[22].lat, estaciones[22].long],
    [estaciones[23].lat, estaciones[23].long],
    [estaciones[24].lat, estaciones[24].long],
    [estaciones[25].lat, estaciones[25].long],
    [estaciones[26].lat, estaciones[26].long],
    [estaciones[27].lat, estaciones[27].long],


];

L.polyline(routeC, { color: 'blue', weight: 5 }).addTo(map);

const routeE = [
    [estaciones[28].lat, estaciones[28].long],
    [estaciones[29].lat, estaciones[29].long],
    [estaciones[30].lat, estaciones[30].long],
    [estaciones[31].lat, estaciones[31].long],
    [estaciones[32].lat, estaciones[32].long],
    [estaciones[33].lat, estaciones[33].long],
];

L.polyline(routeE, { color: 'purple', weight: 5 }).addTo(map);

var rad = function(x) {
    return x * Math.PI / 180;
};
  
var getDistance = function(p1, p2) {
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



let distancia = getDistance(estaciones[0],estaciones[2]);
console.log(distancia);


// L.marker([-34.6096, -58.3730]).addTo(map).bindPopup("Plaza de Mayo");
// L.marker([-34.6022, -58.3810]).addTo(map).bindPopup("Leandro N. Alem");
