
function showRoute(ruta) {
    var route = [];
    ruta.forEach((id) => {
        route.push(estaciones.find(estacion => estacion.id == id));
    });

    const steps = document.getElementById("routeSteps");
    steps.classList.remove("hidden");
    steps.innerHTML = "";

    console.log(route);
    const size = route.length;
    var estacion_previa;

    var total_time = 0;
    var total_distance=0;
    var transbordos=0;
    
    route.forEach((station, index) => {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("flex", "items-start", "space-x-3");

        const numberDiv = document.createElement("div");
        numberDiv.classList.add("flex-shrink-0");
        const numberCircle = document.createElement("div");
        numberCircle.classList.add("w-8", "h-8", "flex", "items-center", "justify-center", "bg-blue-500", "text-white", "rounded-full");
        numberCircle.textContent = index + 1; // Step
        numberDiv.appendChild(numberCircle);

        //Contenido
        const contentDiv = document.createElement("div");

        // Icon + texto

        const topLineDiv = document.createElement("div");
        topLineDiv.classList.add("flex", "items-center", "space-x-2");

        // Add the walking icon if first station
        console.log("index: ", size);
        if (index == 0) {
            const walkingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            walkingIcon.setAttribute("class", "w-6 h-6 text-gray-600");
            walkingIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            walkingIcon.setAttribute("fill", "currentColor");
            walkingIcon.setAttribute("viewBox", "0 0 320 512");
            walkingIcon.innerHTML = `<path d="M208 96a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM73.1 364.7L64 480c-1.7 22.1 15.6 32 30.1 32 14.5 0 27.4-9.4 30.1-24l14.3-85.7L192 384v112c0 16 13.4 32 30.1 32 16.8 0 30.1-13.4 30.1-30.1V366c0-14.7-7.1-28.5-19.1-37l-65.7-47.5 12.6-63.8c32.5 49.6 79.4 86.5 130.9 86.5 16.8 0 30.1-13.4 30.1-30.1s-13.4-30.1-30.1-30.1c-39.3 0-75.3-26.7-101.1-67.5L145.5 121c-12-17.1-30.5-25-49-25-19.6 0-39.1 9.6-49.9 28.4L5.6 223.6c-9.3 15.7-4.2 35.8 11.5 45.1s35.8 4.2 45.1-11.5l33.1-55.7 27.7 39.1-26.6 133.8z"/>`;
            topLineDiv.appendChild(walkingIcon);
        } else {
            const metroIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            metroIcon.setAttribute("class", "w-6 h-6 text-blue-600");
            metroIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            metroIcon.setAttribute("fill", "currentColor");
            metroIcon.setAttribute("viewBox", "0 0 448 512");
            metroIcon.innerHTML = `<path d="M96 0C43 0 0 43 0 96L0 352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512l39.7 0c8.5 0 16.6-3.4 22.6-9.4L160 448l128 0 54.6 54.6c6 6 14.1 9.4 22.6 9.4l39.7 0c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9l0-256c0-53-43-96-96-96L96 0zM64 128c0-17.7 14.3-32 32-32l80 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-80 0c-17.7 0-32-14.3-32-32l0-96zM272 96l80 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-80 0c-17.7 0-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM64 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm288-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>`;
            topLineDiv.appendChild(metroIcon);
        }

        // Add the step description
        if (index == 0) {
            const stepDescription = document.createElement("p");
            stepDescription.classList.add("text-gray-800", "font-medium");
            stepDescription.innerHTML = `Camina hasta la estacion <span class="font-semibold">${station.estacion}</span>`;
            topLineDiv.appendChild(stepDescription);
        } else {
            const stepDescription = document.createElement("p");
            stepDescription.classList.add("text-gray-800", "font-medium");
            console.log("estacion_previa estacion", estacion_previa.estacion);

            stepDescription.innerHTML = `Toma la  <span class="font-semibold"> linea ${station.linea}</span> desde <span class="font-semibold"> ${estacion_previa.estacion} </span> hasta <span class="font-semibold" >${station.estacion}</span>`;
            topLineDiv.appendChild(stepDescription);
        }

        // Add the top line to the content container
        contentDiv.appendChild(topLineDiv);

        // Add the bottom line with duration and distance


        const bottomLine = document.createElement("p");
        bottomLine.classList.add("text-sm", "text-gray-500");

        console.log(estacion_previa, station);
        var minutos = 0
        var distancia = 0
        if (estacion_previa) {
            minutos = getMinutes(estacion_previa, station);
            distancia = calcDistance(estacion_previa,station);
            if(estacion_previa.linea !== station.linea){
                console.log("===============> ",estacion_previa.linea,station.linea);
                transbordos++;
            }
        }

        
        total_distance+=distancia;
        total_time+=minutos;
        bottomLine.textContent = `Duración: ${minutos.toFixed(1)} mins | Distancia: ${distancia.toFixed(0)} m`;
        contentDiv.appendChild(bottomLine);

        // Combine everything into the main step div
        stepDiv.appendChild(numberDiv);
        stepDiv.appendChild(contentDiv);

        steps.appendChild(stepDiv);
        estacion_previa = station;
        console.log("estacion_previa", estacion_previa);
    });
    pathResult(total_time,total_distance,transbordos);
}

function pathResult(total_time, total_distance, transbordos){
    const result = document.getElementById("routeSummary");
    result.classList.remove("hidden");
    console.log("total_distance",total_distance);
    console.log("total_time",total_time);
    console.log("transbordos",transbordos);

    const distancia = document.getElementById("distancia");
    const tiempo = document.getElementById("duracion");
    const transb= document.getElementById("transbordos");

    console.log(distancia);
    distancia.innerHTML = `Distancia del viaje: <span class="font-semibold">${(total_distance/1000).toFixed(2)} km </span>`;
    tiempo.innerHTML = `Tiempo de viaje:  <span class="font-semibold">${(total_time).toFixed(1)} mins </span>`;
    transb.innerHTML = `Transbordos:  <span class="font-semibold"> ${transbordos} </span>`;
    
    
}



/*
 <!-- Step 1 -->
                <div class="flex items-start space-x-3">
                    <!-- Step Number -->
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                            1
                        </div>
                    </div>
                    <!-- Step Content -->
                    <div>
                        <div class="flex items-center space-x-2">
                            <!-- Walking Icon -->
                            <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 320 512">
                                <path
                                    d="M208 96a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM73.1 364.7L64 480c-1.7 22.1 15.6 32 30.1 32 14.5 0 27.4-9.4 30.1-24l14.3-85.7L192 384v112c0 16 13.4 32 30.1 32 16.8 0 30.1-13.4 30.1-30.1V366c0-14.7-7.1-28.5-19.1-37l-65.7-47.5 12.6-63.8c32.5 49.6 79.4 86.5 130.9 86.5 16.8 0 30.1-13.4 30.1-30.1s-13.4-30.1-30.1-30.1c-39.3 0-75.3-26.7-101.1-67.5L145.5 121c-12-17.1-30.5-25-49-25-19.6 0-39.1 9.6-49.9 28.4L5.6 223.6c-9.3 15.7-4.2 35.8 11.5 45.1s35.8 4.2 45.1-11.5l33.1-55.7 27.7 39.1-26.6 133.8z" />
                            </svg>
                            <p class="text-gray-800 font-medium">Camina hasta la <span class="font-semibold">Estación A</span></p>
                        </div>
                        <p class="text-sm text-gray-500">Duración: 5 mins | Distancia: 0.5 km</p>
                    </div>
                </div>


*/