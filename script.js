import { getPokemonDetails, getPokemons } from "./pokemon.js";
const pokemonTable = document.querySelector("#pokemon-table");
const tBody = document.querySelector("#pokemon-table tbody");
const pokemonModal = document.querySelector("#pokemon-modal");
const modalContent = document.querySelector("#modal-content");
const searchInput = document.querySelector("#search-input");
const pagination = document.querySelector("#pagination");

let pokemons = [];
let currentList = [];
window.addEventListener("load", async () => {
  pokemons = await getPokemons();
  currentList = pokemons;
  render(currentList);
});

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

searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  currentList = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  render(currentList);
});

pagination.addEventListener("click", (e) => {
  const p = e.target.closest("p");
  if (!p) return;
  render(currentList, Number(p.textContent));
});

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

function paginate(pokemons, selectedPage, pokemonPerPage = 10) {
  const numberOfPages = Math.ceil(pokemons.length / 10);
  for (let i = 1; i <= numberOfPages; i++) {
    const pageNumber = document.createElement("p");
    pageNumber.classList.add("pageNumber");
    if (i === selectedPage) pageNumber.classList.add("selected-page");

    pageNumber.dataset.id = i;
    pageNumber.textContent = i;
    pagination.appendChild(pageNumber);
  }
  return pokemons.slice(
    (selectedPage - 1) * pokemonPerPage,
    selectedPage * pokemonPerPage
  );
}

function render(pokemons, selectedPage = 1) {
  tBody.innerHTML = "";
  pagination.innerHTML = "";

  const paginatedPokemons = paginate(pokemons, selectedPage);
  paginatedPokemons.forEach((pokemon) => {
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
