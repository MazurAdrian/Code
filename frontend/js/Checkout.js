document.addEventListener("DOMContentLoaded", async () => {
  document.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    alert(formData);
  });
});
