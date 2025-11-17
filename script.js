import getPokemons from "./pokemon.js";
const pokemonTable = document.getElementById("pokemon-table");

function render(html) {
  pokemonTable.innerHTML += html;
}

async function createTable() {
  const pokemonDetails = await getPokemons();
  const pokemonTableContent = pokemonDetails
    .map((pokemonDetail) => {
      return `<tr><td><img src="${pokemonDetail.image}" alt="${pokemonDetail.name}" /></td><td>${pokemonDetail.id}</td><td>${pokemonDetail.name}</td></tr>`;
    })
    .join("");
  render(pokemonTableContent);
}

createTable();
