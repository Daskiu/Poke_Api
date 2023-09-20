// Función para obtener un Pokémon por su ID
async function getPokemonById(id) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Función para mostrar un Pokémon en la lista y agregar un botón
function displayPokemonWithButton(pokemon) {
  const pokemonList = document.getElementById("pokemon-list");
  const listItem = document.createElement("li");

  // Crear un elemento de imagen para mostrar la imagen del Pokémon
  const pokemonImage = document.createElement("img");
  pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  pokemonImage.alt = pokemon.name;

  // Crear un elemento de nombre e ID del Pokémon
  const nameAndId = document.createElement("div");
  nameAndId.textContent = `Nombre: ${pokemon.name}, ID: ${pokemon.id}`;

  // Crear un botón "Siguiente"
  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";

  // Variable para rastrear el número de clics
  let clickCount = 0;

  // Función para manejar los clics en el botón "Siguiente"
  async function handleNextButtonClick() {
    if (clickCount < 2) {
      try {
        const nextPokemonId = pokemon.id + clickCount + 1;
        const nextPokemon = await getPokemonById(nextPokemonId);

        // Actualizar la imagen, nombre e ID del Pokémon
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextPokemon.id}.png`;
        pokemonImage.alt = nextPokemon.name;
        nameAndId.textContent = `Nombre: ${nextPokemon.name}, ID: ${nextPokemon.id}`;
        
        clickCount++;
        
        // Deshabilitar el botón después de 3 clics
        if (clickCount === 2) {
          nextButton.disabled = true;
        }
      } catch (error) {
        console.error("Error al obtener el siguiente Pokémon:", error);
      }
    }
  }

  // Agregar un manejador de clics al botón "Siguiente"
  nextButton.addEventListener("click", handleNextButtonClick);

  // Agregar los elementos al listItem
  listItem.appendChild(pokemonImage);
  listItem.appendChild(nameAndId);
  listItem.appendChild(nextButton);

  // Agregar el listItem a la lista de Pokémon
  pokemonList.appendChild(listItem);
}

// Mostrar tres Pokémon en la lista con botones individuales
async function showThreePokemon() {
  try {
    const pokemon1 = await getPokemonById(1);
    displayPokemonWithButton(pokemon1);

    const pokemon2 = await getPokemonById(4);
    displayPokemonWithButton(pokemon2);

    const pokemon3 = await getPokemonById(7);
    displayPokemonWithButton(pokemon3);
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
  }
}

// Llama a la función para mostrar los Pokémon al cargar la página
showThreePokemon();