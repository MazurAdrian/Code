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

  // Fetch tickets here
  const tickets = templateTickets;

  // Loop through each ticket and insert the formatted HTML into the ticket container
  tickets.forEach((ticket) => {
    ticketsContainer.innerHTML += formattedTicketHTML(ticket);
  });

  const dateInQuery = getDateFromQuery();

  if (dateInQuery)
    dateInputEl.value = `${dateInQuery.getFullYear()}-${String(dateInQuery.getMonth() + 1).padStart(2, "0")}-${String(dateInQuery.getDate()).padStart(2, "0")}`;

  disableBasketButtons(!dateWithinBounds(dateInQuery));

  dateInputEl.addEventListener("input", (event) => {
    const date = new Date(event.target.value);
    setDateIntoQuery(date);

    const dateInBounds = dateWithinBounds(date);
    disableBasketButtons(!dateInBounds);
    dateErrorEl.textContent = dateInBounds
      ? ""
      : "Invalid date! Your desired date must be after today and no more than 2 months in advance!";
  });

  document.addEventListener("click", (event) => {
    const ticketId = event.target.getAttribute("ticket-id");
    const date = getDateFromQuery();

    if (!ticketId || !date || !dateWithinBounds(date)) return;

    // Here we add the ticket to basket via backend
    console.log(`Ticket id: ${ticketId}, date: ${date}`);
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
  if (!date) return false;

  const today = new Date();
  const maxBound = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate(),
  );

  return date > today && date < maxBound;
}

/**
 * Function to get a date object from the query params, or false if not there or invalid
 *
 * @returns {Date|false}
 */
function getDateFromQuery() {
  const url = new URL(window.location.href);

  const [day, month, year] = [
    url.searchParams.get("d"),
    url.searchParams.get("m"),
    url.searchParams.get("y"),
  ];

  if (!day || !month || !year) return false;

  return new Date(year, month - 1, day);
}

/**
 * Insert a date object into the query params
 *
 * @param {Date} date
 */
function setDateIntoQuery(date) {
  const url = new URL(window.location.href);
  url.searchParams.set("d", date.getDate());
  url.searchParams.set("m", date.getMonth() + 1);
  url.searchParams.set("y", date.getFullYear());
  window.history.replaceState({}, "", url);
}

/**
 * Enable or disable all add to basket buttons
 *
 * @param {boolean} toggle
 */
function disableBasketButtons(toggle) {
  if (toggle) {
    document
      .querySelectorAll(".ticket-add-to-basket-button")
      .forEach((buttonEl) => {
        buttonEl.setAttribute("disabled", "");
      });
  } else {
    document
      .querySelectorAll(".ticket-add-to-basket-button")
      .forEach((buttonEl) => {
        buttonEl.removeAttribute("disabled");
      });
  }
}
