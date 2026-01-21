document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    // If the item pressed was not a button, end the function
    if (event.target.tagName.toLowerCase() !== "button") return;

    // Get the ticket id from the button pressed
    const ticketId = event.target.getAttribute("ticket-id");

    // If there is no ticket id, its not an add to basket button, so end the function
    if (!ticketId) return;

    // Insert logic to add to basket
  });
});
