window.addEventListener("DOMContentLoaded", () => {
  // Insert a dynamic content.html file into the target html
  fetch("/frontend/navbar/content.html")
    .then((res) => res.text())
    .then((navbarHTML) =>
      document.body.insertAdjacentHTML("afterbegin", navbarHTML)
    );

  // Insert a dynamic style.css file into the target html
  fetch("/frontend/navbar/style.css")
    .then((res) => res.text())
    .then((navbarCSS) =>
      document.head.insertAdjacentHTML(
        "beforeend",
        `<style>${navbarCSS}</style>`
      )
    );

  // Event that is executed when a navbar button is pressed
  document.addEventListener("click", (event) => {
    // If the target pressed is not a button, end function
    if (event.target.tagName.toLowerCase() !== "button") return;

    // Get the "nav-dest" attribute from the button
    const destination = event.target.getAttribute("nav-dest");

    // If there is no "nav-dest" attribute, it is not a redirect button so end the function
    if (!destination) return;

    // Format the destination to be dynamic across all pages
    const formattedDestination = `/frontend/pages/${destination}`;

    window.location = formattedDestination;
  });
});
