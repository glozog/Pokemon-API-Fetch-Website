
document.addEventListener('DOMContentLoaded', function() {
  

    // Create floating Pokéballs
    createFloatingPokeballs();
});

function createFloatingPokeballs() {
    const body = document.body;
    const pokeballCount = 10; // Number of Pokéballs

    for (let i = 0; i < pokeballCount; i++) {
        const pokeball = document.createElement('div');
        pokeball.classList.add('pokeball');
        
        // Random position
        pokeball.style.left = `${Math.random() * 100}vw`;
        pokeball.style.top = `${Math.random() * 100}vh`;
        
        // Random size
        const size = 30 + Math.random() * 60; // Between 30px and 90px
        pokeball.style.width = `${size}px`;
        pokeball.style.height = `${size}px`;
        
        // Random animation duration
        pokeball.style.animationDuration = `${6 + Math.random() * 4}s`; // Between 6s and 10s
        
        // Random delay
        pokeball.style.animationDelay = `${Math.random() * 5}s`;

        body.appendChild(pokeball);
    }
}





document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("pokemonName");
    const searchButton = document.getElementById("searchButton");

    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            fetchData();
        }
    });

    searchButton.addEventListener("click", fetchData);
});

async function fetchData() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const loadingIndicator = document.getElementById("loadingIndicator");
    const errorMessage = document.getElementById("errorMessage");
    const pokemonInfo = document.getElementById("pokemonInfo");
    const imgElement = document.getElementById("pokemonSprite");
    const typeElement = document.getElementById("pokemonType");
    const heightElement = document.getElementById("pokemonHeight");

    // Reset display
    errorMessage.style.display = "none";
    pokemonInfo.style.display = "none";
    loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Couldn't find that Pokemon. Please try another name.");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemonType = data.types[0].type.name;
        const pokemonHeight = data.height;

        imgElement.src = pokemonSprite;
        typeElement.textContent = `Type: ${pokemonType}`;
        heightElement.textContent = `Height: ${pokemonHeight / 10} m`; // Height is in decimeters, convert to meters

        pokemonInfo.style.display = "flex";
    }
    catch(error) {
        console.error(error);
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
    finally {
        loadingIndicator.style.display = "none";
    }
}