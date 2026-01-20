window.addEventListener("DOMContentLoaded", () => {
  // Insert a dynamic content.html file into the target html
  const navbarEl = document.getElementsByTagName("header")[0];
  fetch("/frontend/navbar/content.html")
    .then((res) => res.text())
    .then((html) => (navbarEl.innerHTML = html));

  // Insert a dynamic navbar style.css into the target html
  fetch("/frontend/navbar/style.css")
    .then((res) => res.text())
    .then((css) =>
      document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`)
    );
});
