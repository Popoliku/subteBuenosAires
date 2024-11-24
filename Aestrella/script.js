

document.getElementById("findPathBtn").addEventListener("click", () => {
    const startStation = document.getElementById("start").value.trim();
    const endStation = document.getElementById("end").value.trim();

    if (!startStation && !endStation) {
        document.getElementById("result").innerText = "Introduzca el trayecto";
        return;
    }

    if (!startStation) {
        document.getElementById("result").innerText = "Introduzca estacion de inicio";
        return;
    }
    if (!endStation) {
        document.getElementById("result").innerText = "Introduzca estacion de llegada";
        return;
    }


    const load = document.getElementById("loading");

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    load.classList.remove("hidden"); 

    sleep(1000).then(() => {
        load.classList.add("hidden"); 


        const mockPath = `Camino optimo desde ${startStation} a ${endStation} es:.`;

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




    });


    
});

console.log("Script loaded");


//MAPA
const map = L.map('map').setView([-34.6083, -58.3712], 13); // Inicializar en Buenos Aires 

//Anadir el mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



map.on('click', function (e) {
    console.log(`clicked on ${e.latlng}`);
});


const estaciones = [
    { "long": -58.373955807, "lat": -34.6078023364, "id": 1.0, "estacion": "CATEDRAL", "linea": "D" },
    { "long": -58.3805743429, "lat": -34.604245203, "id": 2.0, "estacion": "9 DE JULIO", "linea": "D" },
    { "long": -58.3851423588, "lat": -34.6015871651, "id": 3.0, "estacion": "TRIBUNALES - TEATRO COL\u00d3N", "linea": "D" },
    { "long": -58.393125181, "lat": -34.5996395524, "id": 4.0, "estacion": "CALLAO", "linea": "D" },
    { "long": -58.3979237556, "lat": -34.5997570808, "id": 5.0, "estacion": "FACULTAD DE MEDICINA", "linea": "D" },
    { "long": -58.3699298501, "lat": -34.6029894966, "id": 6.0, "estacion": "LEANDRO N. ALEM", "linea": "B" },
    { "long": -58.3750715183, "lat": -34.6032972856, "id": 7.0, "estacion": "FLORIDA", "linea": "B" },
    { "long": -58.3807148471, "lat": -34.6036371052, "id": 8.0, "estacion": "CARLOS PELLEGRINI", "linea": "B" },
    { "long": -58.3872961335, "lat": -34.6040935531, "id": 9.0, "estacion": "URUGUAY", "linea": "B" },
    { "long": -58.3923142351, "lat": -34.6044195429, "id": 10.0, "estacion": "CALLAO - MAESTRO ALFREDO BRAVO", "linea": "B" },
    { "long": -58.3994742567, "lat": -34.6046429679, "id": 11.0, "estacion": "PASTEUR", "linea": "B" },
    { "long": -58.370968499, "lat": -34.6088103092, "id": 12.0, "estacion": "PLAZA DE MAYO", "linea": "A" },
    { "long": -58.3742677264, "lat": -34.6085590739, "id": 13.0, "estacion": "PERÚ", "linea": "A" },
    { "long": -58.3790851531, "lat": -34.6088817212, "id": 14.0, "estacion": "PIEDRAS", "linea": "A" },
    { "long": -58.382232401, "lat": -34.6090998066, "id": 15.0, "estacion": "LIMA", "linea": "A" },
    { "long": -58.3867771941, "lat": -34.6094125865, "id": 16.0, "estacion": "SAENZ PE\u00d1A", "linea": "A" },
    { "long": -58.3926688247, "lat": -34.6092256843, "id": 17.0, "estacion": "CONGRESO - PDTE. DR. RA\u00daL R. ALFONS\u00cdN", "linea": "A" },
    { "long": -58.3984269918, "lat": -34.6096459617, "id": 18.0, "estacion": "PASCO", "linea": "A" },
    { "long": -58.4012075342, "lat": -34.6098335784, "id": 19.0, "estacion": "ALBERTI", "linea": "A" },
    { "long": -58.3740182165, "lat": -34.5911938083, "id": 20.0, "estacion": "RETIRO", "linea": "C" },
    { "long": -58.377819051, "lat": -34.5950574048, "id": 21.0, "estacion": "SAN MARTIN", "linea": "C" },
    { "long": -58.3781557828, "lat": -34.601769923, "id": 22.0, "estacion": "LAVALLE", "linea": "C" },
    { "long": -58.3795299801, "lat": -34.6048437399, "id": 23.0, "estacion": "DIAGONAL NORTE", "linea": "C" },
    { "long": -58.380610718, "lat": -34.6089833149, "id": 24.0, "estacion": "AV. DE MAYO", "linea": "C" },
    { "long": -58.3804444697, "lat": -34.6126172798, "id": 25.0, "estacion": "MORENO", "linea": "C" },
    { "long": -58.3801736105, "lat": -34.6181255993, "id": 26.0, "estacion": "INDEPENDENCIA", "linea": "C" },
    { "long": -58.3799211789, "lat": -34.6219167322, "id": 27.0, "estacion": "SAN JUAN", "linea": "C" },
    { "long": -58.3814344339, "lat": -34.6276194523, "id": 30.0, "estacion": "CONSTITUCION", "linea": "C" },
    { "long": -58.3736842242, "lat": -34.6092424289, "id": 31.0, "estacion": "BOLIVAR", "linea": "E" },
    { "long": -58.3775808865, "lat": -34.6128491058, "id": 32.0, "estacion": "BELGRANO", "linea": "E" },
    { "long": -58.3815349417, "lat": -34.617937394, "id": 33.0, "estacion": "INDEPENDENCIA", "linea": "E" },
    { "long": -58.3851485496, "lat": -34.6223394919, "id": 34.0, "estacion": "SAN JOSE", "linea": "E" },
    { "long": -58.3915117, "lat": -34.6227196661, "id": 35.0, "estacion": "ENTRE RIOS - RODOLFO WALSH", "linea": "E" },
    { "long": -58.3970680747, "lat": -34.6231098658, "id": 36.0, "estacion": "PICHINCHA", "linea": "E" },
];


//Circulo rojo para estacion
const customDivIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: red; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});


estaciones.forEach(estacion => {
    const marker = L.marker([estacion.lat, estacion.long], { icon: customDivIcon }).addTo(map).bindPopup("Custom Div Icon Marker");
    marker.bindPopup(estacion.estacion);
});


//Seleccionar punto partida en mapa

const inputField1 = document.getElementById("end");
const inputField2 = document.getElementById("start");

// Separate marker groups
let startMarkers = [];
let endMarkers = [];

// Add event listeners
inputField1.addEventListener('input', () => handler(inputField1, endMarkers, 'bg-blue-900'));
inputField2.addEventListener('input', () => handler(inputField2, startMarkers, 'bg-green-700'));

function handler(inputField, markerGroup, color) {
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
    const matchedStation = estaciones.find(estacion =>
        estacion.estacion.toLowerCase() === inputValue
    );

    if (matchedStation) {
        console.log(`Station found: ${matchedStation.estacion}`);
        const selected = L.divIcon({
            className: 'custom-div-icon marker-grow',
            html: `<div class="marker-grow rounded-full ${color} animate-grow" style="width: 20px; height: 20px;"></div>`,
            iconSize: [20, 20]
        });


        // Add marker for the matched station
        const marker = L.marker([matchedStation.lat, matchedStation.long], { icon: selected, zIndexOffset: 1000 })
            .addTo(map)
            .bindPopup(matchedStation.estacion);

        markerGroup.push(marker); // Add to the correct marker group
    } else {
        console.log("No matching station found.");
    }
}




const route = [
    [estaciones[0].lat, estaciones[0].long],
    [estaciones[1].lat, estaciones[1].long],
    [estaciones[2].lat, estaciones[2].long],
    [estaciones[3].lat, estaciones[3].long],
    [estaciones[4].lat, estaciones[4].long],
    [estaciones[5].lat, estaciones[5].long],
    [estaciones[6].lat, estaciones[6].long],

];
L.polyline(route, { color: 'red', weight: 5 }).addTo(map);



// L.marker([-34.6096, -58.3730]).addTo(map).bindPopup("Plaza de Mayo");
// L.marker([-34.6022, -58.3810]).addTo(map).bindPopup("Leandro N. Alem");


//ampliar mapa
const mapContainer = document.getElementById("map-container");
const ampliar = document.getElementById("ampliar-mapa");
const closeFullscreen = document.getElementById("close-fullscreen");

ampliar.addEventListener("click", () => {
    mapContainer.classList.add('fullscreen');
    map.invalidateSize(); //comprobar si container cambio
    closeFullscreen.classList.remove('hidden'); //para que aparezca la X
});


function closeFullscreenMap(e) {
    mapContainer.classList.remove('fullscreen');
    map.invalidateSize();

    closeFullscreen.classList.add('hidden');
}

closeFullscreen.addEventListener("click", closeFullscreenMap);
document.body.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        closeFullscreenMap();
    }
});
