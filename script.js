import { getPokemonDetails, getPokemons } from "./pokemon.js";
const pokemonTable = document.querySelector("#pokemon-table");
const tBody = document.querySelector("#pokemon-table tbody");
const pokemonModal = document.querySelector("#pokemon-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalBtn = document.querySelector("#close-modal-btn");

async function createTable() {
  const pokemons = await getPokemons();
  pokemons.forEach((pokemon, idx) => {
    const row = document.createElement("tr");
    row.classList.add("pokemon-row");
    row.dataset.id = pokemon.url.split("/").filter(Boolean).pop();
    row.innerHTML = `<td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
      .split("/")
      .filter(Boolean)
      .pop()}.png" alt="${pokemon.name}" /></td><td>${pokemon.url
      .split("/")
      .filter(Boolean)
      .pop()}</td><td>${
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

closeModalBtn.addEventListener("click", () =>
  pokemonModal.classList.add("hidden")
);

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

createTable();
