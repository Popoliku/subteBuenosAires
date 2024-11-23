const stations = [
    "Alberti",
    "Plaza de Mayo",
    "Pasteur",
    "Leandro N. Alem",
    "Facultad de Medicina",
    "Catedral",
    "Pichincha",
    "Bolívar",
    "Independencia",
    "Perú",
    "Lima",
    "Avenida de Mayo",
    "Diagonal Norte",
    "9 de Julio",
    "Carlos Pellegrini"
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

    document.addEventListener('click', (e) => {
        if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${suggestionsId}`)) {
            suggestionsBox.innerHTML = '';
        }
    });
}


setupAutocomplete('start', 'startSuggestions');
setupAutocomplete('end', 'endSuggestions');
