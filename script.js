import getPokemons from "./pokemon.js";
const pokemonTable = document.querySelector("#pokemon-table");
const tBody = document.querySelector("#pokemon-table tbody");
const pokemonModal = document.querySelector("#pokemon-modal");
const modalContent = document.querySelector("#modal-content");

async function createTable() {
  const pokemonDetails = await getPokemons();
  pokemonDetails.forEach((pokemon) => {
    const row = document.createElement("tr");
    row.classList.add = "pokemon-row";
    row.dataset.id = pokemon.id;
    row.innerHTML = `<td><img src="${pokemon.image}" alt="${pokemon.name}"</td><td>${pokemon.id}</td><td>${pokemon.name}</td>`;
    tBody.appendChild(row);
  });
}

createTable();

pokemonTable.addEventListener("click", (e) => {
  const clickedRow = e.target.closest("tr");
  if (!clickedRow) return;
  const id = clickedRow.dataset.id;
  showPokemonDetails(id);
});

async function showPokemonDetails(id) {
  const pokemonDetail = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  ).then((res) => res.json());
  pokemonModal.classList.remove("hidden");
  modalContent.innerHTML = `<div><img src="${
    pokemonDetail.sprites.front_default
  }" alt="${pokemonDetail.name}" /><div>${
    pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)
  }</div></div>`;
  modalContent.innerHTML += `<div><div>Abilities:</div><div><ul>${pokemonDetail.abilities
    .map((ability) => `<li>${ability.ability.name}</li>`)
    .join("")}</ul></div></div>`;
  console.log(pokemonDetail.abilities);
}

pokemonModal.addEventListener("click", () => {
  pokemonModal.classList.add("hidden");
});
