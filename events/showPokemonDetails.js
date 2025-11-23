import { capitalize } from "../capitalize.js";
import { getPokemonDetails } from "../pokemon.js";
let pokemonModal, pokemonModalContent;

// Fetches the details of clicked Pokemon and shows on Modal page
export function initModal() {
  const pokemonTableTbody = document.querySelector("#pokemon-table tbody");
  pokemonModal = document.querySelector("#pokemon-modal");
  pokemonModalContent = document.querySelector("#pokemon-modal__content");

  if (!pokemonTableTbody || !pokemonModal || !pokemonModalContent) {
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
    pokemonModal.classList.add("pokemon-modal--hidden");
  });

  pokemonModalContent.addEventListener("click", (e) => e.stopPropagation());
}

export async function showPokemonDetails(id) {
  const pokemonDetails = await getPokemonDetails(id);
  pokemonModal.classList.remove("pokemon-modal--hidden");
  const abilitiesHtml = `<div class="pokemon-modal__abilities"><div class="pokemon-modal__abilities-title">Abilities:</div><div class="pokemon-modal__abilities-value"><ul>${pokemonDetails.abilities
    .map(
      (ability) =>
        `<li>${ability.ability.name
          .split("-")
          .map((name) => capitalize(name))
          .join(" ")}</li>`
    )
    .join("")}</ul></div></div>`;

  const statsHtml = `<div class="pokemon-modal__stats"><div class="pokemon-modal__stats-title">Stats:</div><div class="pokemon-modal__stats-value"><table class="pokemon-modal__table"><thead><tr><td>Hp</td><td>Attack</td><td>Defense</td><td>Sp.Atk</td><td>Sp.Def</td><td>Speed</td></tr></thead><tbody><tr>${pokemonDetails.stats
    .map((stat) => `<td>${stat.base_stat}</td>`)
    .join("")}</tr></tbody></table></div></div>`;

  pokemonModalContent.innerHTML = `<div class="pokemon-modal__close-button"><button id="pokemon-modal__close-button">✖</button></div><div><img src="${
    pokemonDetails.sprites.front_default
  }" alt="${
    pokemonDetails.name
  }" /><div class="pokemon-modal__name">${capitalize(
    pokemonDetails.name
  )}</div></div>${abilitiesHtml}${statsHtml}`;
  const pokemonModalCloseButton = document.querySelector(
    "#pokemon-modal__close-button"
  );
  pokemonModalCloseButton.addEventListener("click", () =>
    pokemonModal.classList.add("pokemon-modal--hidden")
  );
}
