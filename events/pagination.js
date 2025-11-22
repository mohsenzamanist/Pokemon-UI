import { render } from "../render.js";
import { setSelectedPage } from "../state.js";

export function initPagination() {
  const pagination = document.querySelector("#pagination");

  if (!pagination) {
    console.log("Pagination field is not found!");
    return;
  }

  pagination.addEventListener("click", (e) => {
    const p = e.target.closest("p");
    if (!p) return;
    setSelectedPage(Number(p.textContent));
    render();
  });
}
