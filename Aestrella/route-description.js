
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
        console.log("index: " ,size);
        if(index == 0 || index + 1== size){
            const walkingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            walkingIcon.setAttribute("class", "w-6 h-6 text-gray-600");
            walkingIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            walkingIcon.setAttribute("fill", "currentColor");
            walkingIcon.setAttribute("viewBox", "0 0 320 512");
            walkingIcon.innerHTML = `<path d="M208 96a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM73.1 364.7L64 480c-1.7 22.1 15.6 32 30.1 32 14.5 0 27.4-9.4 30.1-24l14.3-85.7L192 384v112c0 16 13.4 32 30.1 32 16.8 0 30.1-13.4 30.1-30.1V366c0-14.7-7.1-28.5-19.1-37l-65.7-47.5 12.6-63.8c32.5 49.6 79.4 86.5 130.9 86.5 16.8 0 30.1-13.4 30.1-30.1s-13.4-30.1-30.1-30.1c-39.3 0-75.3-26.7-101.1-67.5L145.5 121c-12-17.1-30.5-25-49-25-19.6 0-39.1 9.6-49.9 28.4L5.6 223.6c-9.3 15.7-4.2 35.8 11.5 45.1s35.8 4.2 45.1-11.5l33.1-55.7 27.7 39.1-26.6 133.8z"/>`;
            topLineDiv.appendChild(walkingIcon);
        }else{
            const walkingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            walkingIcon.setAttribute("class", "w-6 h-6 text-blue-600");
            walkingIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            walkingIcon.setAttribute("fill", "currentColor");
            walkingIcon.setAttribute("viewBox", "0 0 448 512");
            walkingIcon.innerHTML = `<path d="M224 0C100.3 0 0 100.3 0 224v176c0 30.9 25.1 56 56 56h56v-64H64V224c0-88.2 71.8-160 160-160s160 71.8 160 160v168h-48v64h56c30.9 0 56-25.1 56-56V224C448 100.3 347.7 0 224 0z" />`;
            topLineDiv.appendChild(walkingIcon);
        }

        // Add the step description
        if(index == 0 || index + 1 == size){
        const stepDescription = document.createElement("p");
        stepDescription.classList.add("text-gray-800", "font-medium");
        stepDescription.innerHTML = `Camina hasta la estacion <span class="font-semibold">${station.estacion}</span>`;
        topLineDiv.appendChild(stepDescription);
        }else{
            const stepDescription = document.createElement("p");
            stepDescription.classList.add("text-gray-800", "font-medium");
            console.log("estacion_previa estacion",estacion_previa.estacion);

            stepDescription.innerHTML = `Toma la  <span class="font-semibold"> linea ${station.linea}</span> desde <span class="font-semibold"> ${estacion_previa.estacion} </span> hasta <span class="font-semibold" >${station.estacion}</span>`;
            topLineDiv.appendChild(stepDescription);
        }

        // Add the top line to the content container
        contentDiv.appendChild(topLineDiv);

        // Add the bottom line with duration and distance

        
        const bottomLine = document.createElement("p");
        bottomLine.classList.add("text-sm", "text-gray-500");
        bottomLine.textContent = `Duración: ${2} mins | Distancia: jji km`;
        contentDiv.appendChild(bottomLine);

        // Combine everything into the main step div
        stepDiv.appendChild(numberDiv);
        stepDiv.appendChild(contentDiv);

        steps.appendChild(stepDiv);
        estacion_previa=station;
        console.log("estacion_previa",estacion_previa);
    });
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