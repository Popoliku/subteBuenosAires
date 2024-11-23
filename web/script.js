

document.getElementById("findPathBtn").addEventListener("click", () => {
    const startStation = document.getElementById("start").value.trim();
    const endStation = document.getElementById("end").value.trim();

    if (!startStation && !endStation) {
        document.getElementById("invalid").innerText = "Introduzca el trayecto";
        return;
    }

    if (!startStation) {
        document.getElementById("invalid").innerText = "Introduzca estacion de inicio";
        return;
    }
    if (!endStation) {
        document.getElementById("invalid").innerText = "Introduzca estacion de llegada";
        return;
    }

    document.getElementById("invalid").innerText = "";


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
const map = L.map('map',{
    zoomAnimation: true,
    easeLinearity: 0.5, // Controls the animation speed
}).setView([-34.6083, -58.3712],12); // Inicializar en Buenos Aires 


//Anadir el mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
    updateWhenIdle: true
}).addTo(map);

const bounds = [[-34.705, -58.435], [-34.545, -58.355]]; // Example coordinates
map.fitBounds(bounds);

map.setMinZoom(12); // Prevent excessive zooming out
map.setMaxZoom(18); // Prevent excessive zooming in


map.on('click', function (e) {
    console.log(`clicked on ${e.latlng}`);
});


const estaciones = [
    { "long": -58.3989275854, "lat": -34.6357501803, "id": 1.0, "estacion": "CASEROS", "linea": "H" },
    { "long": -58.400969556, "lat": -34.6293756576, "id": 2.0, "estacion": "INCLAN - MEZQUITA AL AHMAD", "linea": "H" },
    { "long": -58.4023227304, "lat": -34.6230923205, "id": 3.0, "estacion": "HUMBERTO 1\u00b0", "linea": "H" },
    { "long": -58.4047317165, "lat": -34.6152421523, "id": 4.0, "estacion": "VENEZUELA", "linea": "H" },
    { "long": -58.406036381, "lat": -34.6089352416, "id": 5.0, "estacion": "ONCE - 30 DE DICIEMBRE", "linea": "H" },
    { "long": -58.3805743429, "lat": -34.604245203, "id": 6.0, "estacion": "9 DE JULIO", "linea": "D" },
    { "long": -58.3979237556, "lat": -34.5997570808, "id": 7.0, "estacion": "FACULTAD DE MEDICINA", "linea": "D" },
    { "long": -58.3851423588, "lat": -34.6015871651, "id": 8.0, "estacion": "TRIBUNALES - TEATRO COL\u00d3N", "linea": "D" },
    { "long": -58.4071613202, "lat": -34.5916278437, "id": 9.0, "estacion": "AG\u00dcERO", "linea": "D" },
    { "long": -58.415955419, "lat": -34.585155944, "id": 10.0, "estacion": "R.SCALABRINI ORTIZ", "linea": "D" },
    { "long": -58.4211960101, "lat": -34.5814111936, "id": 11.0, "estacion": "PLAZA ITALIA", "linea": "D" },
    { "long": -58.4257114411, "lat": -34.5784220228, "id": 12.0, "estacion": "PALERMO", "linea": "D" },
    { "long": -58.3740182165, "lat": -34.5911938083, "id": 13.0, "estacion": "RETIRO", "linea": "C" },
    { "long": -58.3781557828, "lat": -34.601769923, "id": 14.0, "estacion": "LAVALLE", "linea": "C" },
    { "long": -58.3795299801, "lat": -34.6048437399, "id": 15.0, "estacion": "DIAGONAL NORTE", "linea": "C" },
    { "long": -58.380610718, "lat": -34.6089833149, "id": 16.0, "estacion": "AV. DE MAYO", "linea": "C" },
    { "long": -58.3804444697, "lat": -34.6126172798, "id": 17.0, "estacion": "MORENO", "linea": "C" },
    { "long": -58.3801736105, "lat": -34.6181255993, "id": 18.0, "estacion": "INDEPENDENCIA", "linea": "C" },
    { "long": -58.3814344339, "lat": -34.6276194523, "id": 19.0, "estacion": "CONSTITUCION", "linea": "C" },
    { "long": -58.3750715183, "lat": -34.6032972856, "id": 20.0, "estacion": "FLORIDA", "linea": "B" },
    { "long": -58.3807148471, "lat": -34.6036371052, "id": 21.0, "estacion": "CARLOS PELLEGRINI", "linea": "B" },
    { "long": -58.3872961335, "lat": -34.6040935531, "id": 22.0, "estacion": "URUGUAY", "linea": "B" },
    { "long": -58.3923142351, "lat": -34.6044195429, "id": 23.0, "estacion": "CALLAO - MAESTRO ALFREDO BRAVO", "linea": "B" },
    { "long": -58.3994742567, "lat": -34.6046429679, "id": 24.0, "estacion": "PASTEUR", "linea": "B" },
    { "long": -58.4053994398, "lat": -34.6045810554, "id": 25.0, "estacion": "PUEYRREDON", "linea": "B" },
    { "long": -58.4117625996, "lat": -34.6040795173, "id": 26.0, "estacion": "CARLOS GARDEL", "linea": "B" },
    { "long": -58.4209624703, "lat": -34.6031649011, "id": 27.0, "estacion": "ALMAGRO - MEDRANO", "linea": "B" },
    { "long": -58.4312738603, "lat": -34.6021622293, "id": 28.0, "estacion": "ANGEL GALLARDO", "linea": "B" },
    { "long": -58.4397714984, "lat": -34.5989673642, "id": 29.0, "estacion": "MALABIA - OSVALDO PUGLIESE", "linea": "B" },
    { "long": -58.4475730925, "lat": -34.5917181536, "id": 30.0, "estacion": "DORREGO", "linea": "B" },
    { "long": -58.3742677264, "lat": -34.6085590739, "id": 31.0, "estacion": "PERÚ", "linea": "A" },
    { "long": -58.3790851531, "lat": -34.6088817212, "id": 32.0, "estacion": "PIEDRAS", "linea": "A" },
    { "long": -58.382232401, "lat": -34.6090998066, "id": 33.0, "estacion": "LIMA", "linea": "A" },
    { "long": -58.3867771941, "lat": -34.6094125865, "id": 34.0, "estacion": "SAENZ PE\u00d1A", "linea": "A" },
    { "long": -58.3926688247, "lat": -34.6092256843, "id": 35.0, "estacion": "CONGRESO - PDTE. DR. RA\u00daL R. ALFONS\u00cdN", "linea": "A" },
    { "long": -58.3984269918, "lat": -34.6096459617, "id": 36.0, "estacion": "PASCO", "linea": "A" },
    { "long": -58.4012075342, "lat": -34.6098335784, "id": 37.0, "estacion": "ALBERTI", "linea": "A" },
    { "long": -58.4067071165, "lat": -34.6098172457, "id": 38.0, "estacion": "PLAZA DE MISERERE", "linea": "A" },
    { "long": -58.4151857088, "lat": -34.6107816905, "id": 39.0, "estacion": "LORIA", "linea": "A" },
    { "long": -58.4218156714, "lat": -34.6117702291, "id": 40.0, "estacion": "CASTRO BARROS", "linea": "A" },
    { "long": -58.4295003233, "lat": -34.6152056103, "id": 41.0, "estacion": "RIO DE JANEIRO", "linea": "A" },
    { "long": -58.4364285288, "lat": -34.6182799671, "id": 42.0, "estacion": "ACOYTE", "linea": "A" },
    { "long": -58.4411776251, "lat": -34.6204052129, "id": 43.0, "estacion": "PRIMERA JUNTA", "linea": "A" },
    { "long": -58.3736842242, "lat": -34.6092424289, "id": 44.0, "estacion": "BOLIVAR", "linea": "E" },
    { "long": -58.3775808865, "lat": -34.6128491058, "id": 45.0, "estacion": "BELGRANO", "linea": "E" },
    { "long": -58.3815349417, "lat": -34.617937394, "id": 46.0, "estacion": "INDEPENDENCIA", "linea": "E" },
    { "long": -58.3851485496, "lat": -34.6223394919, "id": 47.0, "estacion": "SAN JOSE", "linea": "E" },
    { "long": -58.3915117, "lat": -34.6227196661, "id": 48.0, "estacion": "ENTRE RIOS - RODOLFO WALSH", "linea": "E" },
    { "long": -58.3970680747, "lat": -34.6231098658, "id": 49.0, "estacion": "PICHINCHA", "linea": "E" },
    { "long": -58.4029365803, "lat": -34.6238657116, "id": 50.0, "estacion": "JUJUY", "linea": "E" },
    { "long": -58.4093907834, "lat": -34.6246537865, "id": 51.0, "estacion": "URQUIZA", "linea": "E" },
    { "long": -58.4338162502, "lat": -34.6280175488, "id": 52.0, "estacion": "JOSE MARIA MORENO", "linea": "E" },
    { "long": -58.442170706, "lat": -34.6310418422, "id": 53.0, "estacion": "EMILIO MITRE", "linea": "E" },
    { "long": -58.4112939014, "lat": -34.5882371084, "id": 54.0, "estacion": "BULNES", "linea": "D" },
    { "long": -58.4023953425, "lat": -34.5944257186, "id": 55.0, "estacion": "PUEYRREDON", "linea": "D" },
    { "long": -58.393125181, "lat": -34.5996395524, "id": 56.0, "estacion": "CALLAO", "linea": "D" },
    { "long": -58.377819051, "lat": -34.5950574048, "id": 57.0, "estacion": "SAN MARTIN", "linea": "C" },
    { "long": -58.3799211789, "lat": -34.6219167322, "id": 58.0, "estacion": "SAN JUAN", "linea": "C" },
    { "long": -58.4502782564, "lat": -34.6363891894, "id": 59.0, "estacion": "MEDALLA MILAGROSA", "linea": "E" },
    { "long": -58.4267890229, "lat": -34.627015467, "id": 60.0, "estacion": "AV. LA PLATA", "linea": "E" },
    { "long": -58.415532819, "lat": -34.6253661059, "id": 61.0, "estacion": "BOEDO", "linea": "E" },
    { "long": -58.4350135337, "lat": -34.5751783641, "id": 62.0, "estacion": "MINISTRO CARRANZA - MIGUEL ABUELO", "linea": "D" },
    { "long": -58.4446681483, "lat": -34.5700123078, "id": 63.0, "estacion": "OLLEROS", "linea": "D" },
    { "long": -58.4521256034, "lat": -34.5662152422, "id": 64.0, "estacion": "JOSE HERNANDEZ", "linea": "D" },
    { "long": -58.4564891346, "lat": -34.562309087, "id": 65.0, "estacion": "JURAMENTO", "linea": "D" },
    { "long": -58.4550292863, "lat": -34.587197853, "id": 66.0, "estacion": "FEDERICO LACROZE", "linea": "B" },
    { "long": -58.4616517617, "lat": -34.6433121624, "id": 67.0, "estacion": "PLAZA DE LOS VIRREYES - EVA PERON", "linea": "E" },
    { "long": -58.4578917558, "lat": -34.6401373523, "id": 68.0, "estacion": "VARELA", "linea": "E" },
    { "long": -58.373955807, "lat": -34.6078023364, "id": 69.0, "estacion": "CATEDRAL", "linea": "D" },
    { "long": -58.370968499, "lat": -34.6088103092, "id": 70.0, "estacion": "PLAZA DE MAYO", "linea": "A" },
    { "long": -58.4623784082, "lat": -34.5556417664, "id": 71.0, "estacion": "CONGRESO DE TUCUMAN", "linea": "D" },
    { "long": -58.3699298501, "lat": -34.6029894966, "id": 72.0, "estacion": "LEANDRO N. ALEM", "linea": "B" },
    { "long": -58.4662272047, "lat": -34.5840946201, "id": 73.0, "estacion": "TRONADOR - VILLA ORT\u00daZAR", "linea": "B" },
    { "long": -58.4742408262, "lat": -34.581248846, "id": 74.0, "estacion": "DE LOS INCAS -PQUE. CHAS", "linea": "B" },
    { "long": -58.4567097975, "lat": -34.6266665932, "id": 75.0, "estacion": "CARABOBO", "linea": "A" },
    { "long": -58.448647654, "lat": -34.6235289529, "id": 76.0, "estacion": "PUAN", "linea": "A" },
    { "long": -58.4054503285, "lat": -34.6044902016, "id": 77.0, "estacion": "CORRIENTES", "linea": "H" },
    { "long": -58.405794826, "lat": -34.6384059883, "id": 78.0, "estacion": "PARQUE PATRICIOS", "linea": "H" },
    { "long": -58.4123851512, "lat": -34.6412689434, "id": 79.0, "estacion": "HOSPITALES", "linea": "H" },
    { "long": -58.4810135037, "lat": -34.5777973775, "id": 80.0, "estacion": "ECHEVERR\u00cdA", "linea": "B" },
    { "long": -58.4863853479, "lat": -34.5743189143, "id": 81.0, "estacion": "JUAN MANUEL DE ROSAS - VILLA URQUIZA", "linea": "B" },
    { "long": -58.4696396292, "lat": -34.630707087, "id": 83.0, "estacion": "SAN PEDRITO", "linea": "A" },
    { "long": -58.4635405106, "lat": -34.6290872268, "id": 82.0, "estacion": "SAN JOS\u00c9 DE FLORES", "linea": "A" },
    { "long": -58.4037214964, "lat": -34.5984551118, "id": 84.0, "estacion": "C\u00d3RDOBA", "linea": "H" },
    { "long": -58.3972155751, "lat": -34.5874615464, "id": 85.0, "estacion": "LAS HERAS", "linea": "H" },
    { "long": -58.402376175, "lat": -34.5945253962, "id": 86.0, "estacion": "SANTA FE - CARLOS JAUREGUI", "linea": "H" },
    { "long": -58.3910188266, "lat": -34.58303634, "id": 87.0, "estacion": "FACULTAD DE DERECHO - JULIETA LANTERI", "linea": "H" },
    { "long": -58.3758498374, "lat": -34.5921143619, "id": 90.0, "estacion": "RETIRO", "linea": "E" },
    { "long": -58.371700333, "lat": -34.596596819, "id": 89.0, "estacion": "CATALINAS", "linea": "E" },
    { "long": -58.3704125011, "lat": -34.6030139059, "id": 88.0, "estacion": "CORREO CENTRAL", "linea": "E" }
];

estaciones.sort((a, b) => {
    if (a.linea < b.linea) return -1; // 'A' comes before 'B'
    if (a.linea > b.linea) return 1;  // 'H' comes after 'E'
    return 0; // Keep the original order if they are the same
});


//Circulo rojo para estacion
const customDivIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: red; width: 20px; height: 20px; border-radius: 50%;'></div>",
    iconSize: [20, 20]
});

const lineColors = {
    "A": "cyan",
    "B": "red",
    "C": "blue",
    "D": "green",
    "E": "purple",
    "H": "yellow"
};

estaciones.forEach(estacion => {
    const color = lineColors[estacion.linea] || "gray"; 
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color: ${color}; width: 15px; height: 15px; border-radius: 50%;'></div>`,
        iconSize: [15, 15]
    });

    const marker = L.marker([estacion.lat, estacion.long], { icon: customIcon }).addTo(map);
    marker.bindPopup(`<b>${estacion.estacion}</b><br>Linea: ${estacion.linea}`); //saber que linea es la parada
});


const routes = new Map(); 

estaciones.forEach(estacion => {
    const line = estacion.linea;
    const coord = [estacion.lat, estacion.long];
    if (!routes.has(line)) {
        routes.set(line, []);
    }
    routes.get(line).push(coord);
})

console.log(routes);
const route = [
    [estaciones[0].lat, estaciones[0].long],
    [estaciones[1].lat, estaciones[1].long],
    [estaciones[2].lat, estaciones[2].long],
    [estaciones[3].lat, estaciones[3].long],
    [estaciones[4].lat, estaciones[4].long],
    [estaciones[5].lat, estaciones[5].long],
    [estaciones[6].lat, estaciones[6].long],

];
routes.forEach((route,line) =>{
    const r = route;
    r.sort();
    L.polyline(r, { color: `${lineColors[line]}`, weight: 5 }).addTo(map);
})


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


