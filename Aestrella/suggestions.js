const stations = [
    "9 de Julio",
    "Alberti",
    "Avenida de Mayo",
    "Belgrano",
    "Bolívar",
    "Callao (línea B)",
    "Callao (línea D)",
    "Carlos Pellegrini",
    "Catedral",
    "Congreso",
    "Constitución",
    "Diagonal Norte",
    "Entre Ríos",
    "Facultad de Medicina",
    "Florida",
    "Independencia (línea C)",
    "Independencia (línea E)",
    "Lavalle",
    "Leandro N. Alem",
    "Lima",
    "Moreno",
    "Pasco",
    "Pasteur",
    "Perú",
    "Pichincha",
    "Piedras",
    "Plaza de Mayo",
    "Retiro",
    "Saénz Peña",
    "San José",
    "San Juan",
    "San Martín",
    "Tribunales",
    "Uruguay",
];


function setupAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsBox = document.getElementById(suggestionsId);
    console.log(suggestionsBox); // Should log the input element
    

    console.log("HIHI");
    input.addEventListener('input', handler)
    input.addEventListener('click', handler)

    function handler() {
        const query = input.value.toLowerCase();
        suggestionsBox.innerHTML = '';
        // console.log("HIHIs");
        const filteredStations = stations.filter(station =>
            station.toLowerCase().includes(query)
        );

        // console.log(filteredStations);

        filteredStations.forEach(station => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = station;
            suggestionDiv.classList.add(
                'px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-300', 'w-300', 'suggestion-slide'
            );

            suggestionDiv.addEventListener('click', () => {
                input.value = station;
                suggestionsBox.innerHTML = '';
                const event = new Event('input', { bubbles: true });
                input.dispatchEvent(event);
            });

            suggestionsBox.appendChild(suggestionDiv);
        });

    }

    function closeSelect(e){
        if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${suggestionsId}`)) {
            suggestionsBox.innerHTML = '';
        }
    }

    document.body.addEventListener("keydown", (e) => {
        if (e.key === 'Escape') {
            suggestionsBox.innerHTML = '';
        }
    });
    
    document.addEventListener('click', (e) => {
        closeSelect(e);
        console.log("clock");
    });
}


setupAutocomplete('start', 'startSuggestions');
setupAutocomplete('end', 'endSuggestions');
