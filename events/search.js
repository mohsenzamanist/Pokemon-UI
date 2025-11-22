import { getPokemonsState, setCurrentList } from "../state.js";
import { render } from "../render.js";

export function initSearch() {
  const searchInput = document.querySelector("#search-input");
  if (!searchInput) {
    console.log("Search input field is not found!");
    return;
  }

  searchInput.addEventListener("keyup", (e) => {
    const pokemons = getPokemonsState();
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    setCurrentList(filteredList);
    render();
  });
}
