import { getPokemonDetails, getPokemons } from "./pokemon.js";
const pokemonTable = document.querySelector("#pokemon-table");
const tBody = document.querySelector("#pokemon-table tbody");
const pokemonModal = document.querySelector("#pokemon-modal");
const modalContent = document.querySelector("#modal-content");
const searchInput = document.querySelector("#search-input");

var pokemons = [];
window.addEventListener("load", async () => {
  pokemons = await getPokemons();
  render(pokemons);
});

searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  render(filteredPokemons);
});

function render(pokemons) {
  tBody.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const row = document.createElement("tr");
    row.classList.add("pokemon-row");
    const id = pokemon.url.split("/").filter(Boolean).pop();
    row.dataset.id = id;
    row.innerHTML = `<td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${
      pokemon.name
    }" /></td><td>${id}</td><td>${
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }</td>`;
    tBody.appendChild(row);
  });
}

pokemonTable.addEventListener("click", (e) => {
  const clickedRow = e.target.closest("tr");
  if (!clickedRow) return;
  const id = clickedRow.dataset.id;
  showPokemonDetails(id);
});

pokemonModal.addEventListener("click", () => {
  pokemonModal.classList.add("hidden");
});

modalContent.addEventListener("click", (e) => e.stopPropagation());

async function showPokemonDetails(id) {
  const pokemonDetails = await getPokemonDetails(id);
  pokemonModal.classList.remove("hidden");
  const abilitiesHtml = `<div><div>Abilities:</div><div><ul>${pokemonDetails.abilities
    .map((ability) => `<li>${ability.ability.name}</li>`)
    .join("")}</ul></div></div>`;
  modalContent.innerHTML = `<div><img src="${
    pokemonDetails.sprites.front_default
  }" alt="${pokemonDetails.name}" /><div>${
    pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)
  }</div></div>${abilitiesHtml}`;
}
