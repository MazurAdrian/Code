//  This script will manage login and registration based on the form submission

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (event) => {
    // Create a FormData object to store the data in a more orderly manner
    const form = new FormData(event.target);

    // Login and registration both use different routes, so we check for that
    if (event.target.id === "login-form") {
      // Login magic
    } else if (event.target.id === "register-form") {
      // Register magic
    }
  });
});
