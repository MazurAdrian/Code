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

  // Fetch basket from backend here

  // Loop through each ticket and insert the formatted HTML into the ticket container
  templateTickets.forEach((ticket) => {
    ticketsContainer.innerHTML += formattedTicketHTML(ticket);
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
    id="ticket-add-to-basket-button"
    ticket-id="${ticket.ticketId}"
    class="ticket-add-to-basket-button"
  >
    Add To Basket
  </button>
</div>`;
}
