import { getCurrentList } from "../state.js";
import { render } from "../render.js";

// Sorts table on Id or name
export function initSort() {
  const idSortOrder = document.querySelector("#id-sort-order");
  const nameSortOrder = document.querySelector("#name-sort-order");
  const idSortOrderSpan = document.querySelector("#id-sort-order span");
  const nameSortOrderSpan = document.querySelector("#name-sort-order span");

  const currentList = getCurrentList();
  let idAscending = false;
  let nameAscending = false;

  if (
    !idSortOrder ||
    !nameSortOrder ||
    !idSortOrderSpan ||
    !nameSortOrderSpan
  ) {
    console.log("Sort fields not found!");
    return;
  }

  idSortOrder.addEventListener("click", () => {
    idAscending = !idAscending;
    if (nameSortOrderSpan.innerHTML !== "↑↓")
      nameSortOrderSpan.innerHTML = "↑↓";
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

    render();
  });
}
