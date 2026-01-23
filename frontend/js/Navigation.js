import { isLoggedIn } from "./Backend.js";

window.addEventListener("DOMContentLoaded", () => {
  // Insert a dynamic content.html file into the target html
  const navbarEl = document.getElementsByTagName("header")[0];
  const footerEl = document.getElementsByTagName("footer")[0];

  // Navbar

  // Insert authentication functions
  document.head.insertAdjacentHTML(
    "beforeend",
    '<script type="module" src="/frontend/js/Auth.js"></script>',
  );

  fetch("/frontend/templates/navbar/content.html")
    .then((res) => res.text())
    .then((html) => {
      navbarEl.innerHTML = html;
      const navbarLoginBtn = document.getElementById("navbar-login-btn");

      if (isLoggedIn()) {
        navbarLoginBtn.textContent = "Basket";
        navbarLoginBtn.setAttribute("dest", "pages/basket.html");
      } else {
        navbarLoginBtn.textContent = "Login";
        navbarLoginBtn.setAttribute("dest", "pages/login.html");
      }
    });

  // Insert a dynamic navbar style.css into the target html
  fetch("/frontend/templates/navbar/style.css")
    .then((res) => res.text())
    .then((css) =>
      document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`),
    );

  // Footer

  fetch("/frontend/templates/footer/content.html")
    .then((res) => res.text())
    .then((html) => (footerEl.innerHTML = html));

  // Insert a dynamic footer style.css into the target html
  fetch("/frontend/templates/footer/style.css")
    .then((res) => res.text())
    .then((css) =>
      document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`),
    );
});
