import { getSelectedPage, getCurrentList } from "./state.js";

const tBody = document.querySelector("#pokemon-table tbody");
const pagination = document.querySelector("#pagination");

function paginate(pokemonPerPage = 10) {
  const selectedPage = getSelectedPage();
  const currentList = getCurrentList();
  const numberOfPages = Math.ceil(currentList.length / 10);
  for (let i = 1; i <= numberOfPages; i++) {
    const pageNumber = document.createElement("p");
    pageNumber.classList.add("pageNumber");
    if (i === selectedPage) pageNumber.classList.add("selected-page");

    pageNumber.dataset.id = i;
    pageNumber.textContent = i;
    pagination.appendChild(pageNumber);
  }
  return currentList.slice(
    (selectedPage - 1) * pokemonPerPage,
    selectedPage * pokemonPerPage
  );
}

// renders the whole page text
export function render() {
  tBody.innerHTML = "";
  pagination.innerHTML = "";

  const paginatedPokemons = paginate();

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
