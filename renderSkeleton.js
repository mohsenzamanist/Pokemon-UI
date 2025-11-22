const tBody = document.querySelector("#pokemon-table tbody");

export function renderSkeleton() {
  const skeletonArray = Array.from({ length: 10 });
  skeletonArray.forEach((_) => {
    const row = document.createElement("tr");
    row.classList.add("skeleton-row");
    row.innerHTML = `<td></td><td></td><td></td>`;
    tBody.appendChild(row);
  });
}
