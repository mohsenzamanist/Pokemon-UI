import { getPokemonsState, setCurrentList, setSelectedPage } from "../state.js";
import { render } from "../render.js";

// Initialises the search event on keyup event
export function initSearch() {
  const searchInput = document.querySelector("#search-input");
  const clearSearchBtn = document.querySelector("#clear-search");
  if (!searchInput || !clearSearchBtn) {
    console.log("Search input field is not found!");
    return;
  }

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    setCurrentList(getPokemonsState());
    render();
  });

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = searchTerm ? "inline" : "none";
    searchPokemon(searchTerm);
  });

  const searchPokemon = debounce((text) => {
    const pokemons = getPokemonsState();
    const filteredList = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text)
    );
    setCurrentList(filteredList);
    setSelectedPage(1);
    render();
  });

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
}
