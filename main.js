import { getPokemons } from "./pokemon.js";
import { initModal } from "./events/showPokemonDetails.js";
import { setPokmonsState, setCurrentList } from "./state.js";
import { render } from "./render.js";
import { initSearch } from "./events/search.js";
import { initPagination } from "./events/pagination.js";
import { initSort } from "./events/sort.js";
import { renderSkeleton } from "./renderSkeleton.js";
import { initTheme } from "./events/theme.js";

// Loads everything on window load
// and initialises the events and state
window.addEventListener("load", async () => {
  renderSkeleton();

  const pokemons = await getPokemons();
  setPokmonsState(pokemons);
  setCurrentList(pokemons);
  render();
  initTheme();
  initSearch();
  initPagination();
  initModal();
  initSort();
});
