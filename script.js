const getPokemons = require("./pokemon");
(async function () {
  let pokemonDetails = [];
  pokemonDetails = await getPokemons();
  console.log(pokemonDetails);
})();
