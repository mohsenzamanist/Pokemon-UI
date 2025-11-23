let pokemons = [],
  currentList = [];
let selectedPage = 1;

// States of the whole app
export function getPokemonsState() {
  return pokemons;
}

export function getCurrentList() {
  return currentList;
}

export function getSelectedPage() {
  return selectedPage;
}

export function setPokmonsState(data) {
  pokemons = data;
}

export function setCurrentList(data) {
  currentList = data;
}

export function setSelectedPage(n) {
  selectedPage = n;
}
