import { getPokemons } from "./pokemon.js";
import { initModal } from "./events/showPokemonDetails.js";
import { setPokmonsState, setCurrentList } from "./state.js";
import { render } from "./render.js";
import { initSearch } from "./events/search.js";
import { initPagination } from "./events/pagination.js";
import { initSort } from "./events/sort.js";

window.addEventListener("load", async () => {
  const pokemons = await getPokemons();
  setPokmonsState(pokemons);
  setCurrentList(pokemons);
  render();
  initSearch();
  initPagination();
  initModal();
  initSort();
});
