export default async function getPokemons(count = 50) {
  const pokemonFetchs = [];
  for (let i = 0; i < count; i++) {
    pokemonFetchs.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`).then((res) =>
        res.json()
      )
    );
  }
  const pokemonDetails = await Promise.all(pokemonFetchs);
  return extractDesiredData(pokemonDetails);
}

function extractDesiredData(pokemonDetails) {
  return pokemonDetails.map(({ abilities, id, name, stats, sprites }) => {
    return {
      id,
      name,
      abilities,
      stats,
      image: sprites.front_default,
    };
  });
}
