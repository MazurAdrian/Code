document.addEventListener("DOMContentLoaded", () => {
  // Event that is executed when a dest button is pressed
  document.addEventListener("click", (event) => {
    // If the target pressed is not a button, end function
    if (event.target.tagName.toLowerCase() !== "button") return;

    // Get the "dest" attribute from the button
    const destination = event.target.getAttribute("dest");

    // If there is no "dest" attribute, it is not a redirect button so end the function
    if (!destination) return;

    // Format the destination to be dynamic across all pages
    const formattedDestination = `/frontend/${destination}`;

    window.location = formattedDestination;
  });
});
