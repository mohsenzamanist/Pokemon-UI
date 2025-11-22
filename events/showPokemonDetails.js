import { getPokemonDetails } from "../pokemon.js";
let pokemonModal, modalContent;
export function initModal() {
  const pokemonTableTbody = document.querySelector("#pokemon-table tbody");

  pokemonModal = document.querySelector("#pokemon-modal");
  modalContent = document.querySelector("#modal-content");

  if (!pokemonTableTbody || !pokemonModal || !modalContent) {
    console.log("Modal overlay not Found!");
    return;
  }

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
}

export async function showPokemonDetails(id) {
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
