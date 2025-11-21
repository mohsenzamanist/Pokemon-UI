import { getPokemonDetails, getPokemons } from "./pokemon.js";
const pokemonTableTbody = document.querySelector("#pokemon-table tbody");
const tBody = document.querySelector("#pokemon-table tbody");
const pokemonModal = document.querySelector("#pokemon-modal");
const modalContent = document.querySelector("#modal-content");
const searchInput = document.querySelector("#search-input");
const pagination = document.querySelector("#pagination");
const idSortOrder = document.querySelector("#id-sort-order");
const nameSortOrder = document.querySelector("#name-sort-order");
const idSortOrderSpan = document.querySelector("#id-sort-order span");
const nameSortOrderSpan = document.querySelector("#name-sort-order span");
const closeModalBtn = document.querySelector("#close-modal-btn button");

let pokemons = [];
let currentList = [];
let selectedPage = 1;
let idAscending = true;
let nameAscending = true;

window.addEventListener("load", async () => {
  pokemons = await getPokemons();
  currentList = pokemons;
  render(currentList);
});

pokemonTableTbody.addEventListener("click", (e) => {
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
  selectedPage = Number(p.textContent);
  render(currentList);
});

idSortOrder.addEventListener("click", () => {
  idAscending = !idAscending;
  if (nameSortOrderSpan.innerHTML !== "↑↓") nameSortOrderSpan.innerHTML = "↑↓";
  idSortOrderSpan.innerHTML = idAscending ? "↑" : "↓";
  currentList.sort((a, b) => {
    const idA = Number(a.url.split("/").filter(Boolean).pop());
    const idB = Number(b.url.split("/").filter(Boolean).pop());

    return idAscending ? idA - idB : idB - idA;
  });

  render(currentList);
});
nameSortOrder.addEventListener("click", () => {
  nameAscending = !nameAscending;
  if (idSortOrderSpan.innerHTML !== "↑↓") idSortOrderSpan.innerHTML = "↑↓";
  nameSortOrderSpan.innerHTML = nameAscending ? "↑" : "↓";
  currentList.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    return nameAscending
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  render(currentList);
});

closeModalBtn.addEventListener("click", () => {
  pokemonModal.classList.add("hidden");
  console.log("close");
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

function paginate(pokemons, pokemonPerPage = 10) {
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

function render(pokemons) {
  tBody.innerHTML = "";
  pagination.innerHTML = "";

  const paginatedPokemons = paginate(pokemons);

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
