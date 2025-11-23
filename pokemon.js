// Gets the list of pokemons
export async function getPokemons(count = 52) {
  try {
    const pokemonsData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${count}`
    );
    const pokemons = await pokemonsData.json();

    return pokemons.results;
  } catch (error) {
    console.error(error);
  }
}

// Gets the detail of the pokemon with the specified id
export async function getPokemonDetails(id) {
  const pokemonDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await pokemonDetail.json();
}
