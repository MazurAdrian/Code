const templateTickets = [
  {
    ticketId: 0,
    ticketName: "Adults (16+)",
    ticketPrice: 19.99,
    ticketImg: "https://picsum.photos/200/300",
  },
  {
    ticketId: 1,
    ticketName: "Child (5-15)",
    ticketPrice: 14.99,
    ticketImg: "https://picsum.photos/200/300",
  },
  {
    ticketId: 2,
    ticketName: "Toddler (2-4)",
    ticketPrice: 9.49,
    ticketImg: "https://picsum.photos/200/300",
  },
  {
    ticketId: 3,
    ticketName: "Student",
    ticketPrice: 16.49,
    ticketImg: "https://picsum.photos/200/300",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Get the container for the tickets
  const ticketsContainer = document.getElementById("tickets-section");
  const dateInputEl = document.getElementById("dateSelect");
  const dateErrorEl = document.getElementById("date-error");

  // Fetch basket from backend here

  // Loop through each ticket and insert the formatted HTML into the ticket container
  templateTickets.forEach((ticket) => {
    ticketsContainer.innerHTML += formattedTicketHTML(ticket);
  });

  // TICKETS: Add check so that on page load, if there is date query params then
  // buttons should enable by default

  dateInputEl.addEventListener("input", (event) => {
    const date = event.target.value.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];

    const url = new URL(window.location.href);

    url.searchParams.set("d", day);
    url.searchParams.set("m", month);
    url.searchParams.set("y", year);
    window.history.replaceState({}, "", url);

    if (!dateWithinBounds(new Date(date))) {
      dateErrorEl.textContent =
        "Invalid date! Your desired date must be after today and no more than 2 months in advance!";
      document
        .querySelectorAll(".ticket-add-to-basket-button")
        .forEach((buttonEl) => {
          buttonEl.setAttribute("disabled", "");
        });
    } else {
      dateErrorEl.textContent = "";
      document
        .querySelectorAll(".ticket-add-to-basket-button")
        .forEach((buttonEl) => {
          buttonEl.removeAttribute("disabled");
        });
    }
  });
});

/**
 * Function that accepts ticket data and returns a formatted HTML string to be inserted
 *
 * @param {{ticketId: number, ticketName: string, ticketPrice: number, ticketImg: string}} ticket
 * @returns {string}
 */
function formattedTicketHTML(ticket) {
  return `<div class="ticket">
  <img src="${ticket.ticketImg}" alt="${ticket.ticketName}" />
  <div class="ticket-content">
    <h4 id="ticket-name" class="ticket-name">${ticket.ticketName}</h4>
    <p id="ticket-price" class="ticket-price">£${ticket.ticketPrice}</p>
  </div>
  <button
    type="button"
    disabled
    id="ticket-add-to-basket-button"
    ticket-id="${ticket.ticketId}"
    class="ticket-add-to-basket-button"
    ticket-add-to-basket-button=""
  >
    Add To Basket
  </button>
</div>`;
}

/**
 *
 * @param {Date} date
 * @returns {boolean}
 */
function dateWithinBounds(date) {
  const today = new Date();
  const maxBound = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate(),
  );

  return date > today && date < maxBound;
}
