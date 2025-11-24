export function initTheme() {
  const themebtn = document.querySelector("#theme-toggle");

  themebtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    themebtn.innerHTML = isDark ? "☀️" : "🌙";
  });
}
