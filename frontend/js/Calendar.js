// Wait for the page to load all its contents
document.addEventListener("DOMContentLoaded", function () {
  // Get the calendar container element
  const calendarEl = document.getElementById("calendar");
  // Create a new calendar from the FullCalendar library
  // with custom options
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    navLinks: true,
    views: {
      dayGridMonth: { type: "dayGridMonth" },
    },
    navLinkDayClick: calendarDateClickEvent, // When a date is pressed
    events: [],
    eventDisplay: "none",

    validRange: (nowDate) => ({
      start: new Date(), // Hide all days that are before today
    }),
    selectable: false,
    editable: false,
  });
  calendar.render();

  /**
   * Disable the "prev" button when at the first allowed month
   */
  function syncPrevDisabled() {
    // Get the current date
    const now = new Date();
    // Get the first day of the month from the current year and month
    const min = new Date(now.getFullYear(), now.getMonth(), 1);

    // Create a new date from the date page that the calendar is on
    const viewStart = new Date(calendar.view.currentStart);
    // Is the current page at the lowest month possible, meaning the current month
    const atMinMonth =
      viewStart.getFullYear() === min.getFullYear() &&
      viewStart.getMonth() === min.getMonth();

    // Get the "previous" button from the calendar
    const prevBtn = calendarEl.querySelector(".fc-prev-button");
    // If there is a "previous" button, and the user is at the lowest month possible
    // then disable the button
    if (prevBtn) prevBtn.disabled = atMinMonth;
  }

  calendar.on("dateSet", syncPrevDisabled);
  syncPrevDisabled();
});

/**
 * A function that sends a request to the backend api to get certain booking information for a day.
 *
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns {{availability: {isAvailable: boolean, notice: string}, special: {hasSpecial: boolean, specials: [{specialTitle: string, specialNotice: string}]}}}
 */
function getDayInfo(day, month, year) {
  // Magic backend request stuff

  const dateInfo = {
    availability: {
      isAvailable: true,
      notice: "There are plenty slots left on this day!",
    },
    special: {
      hasSpecial: true,
      specials: [
        {
          specialTitle: "Super Sunday",
          specialNotice:
            "Every ticket comes with a complementary 7% discount on all animal treats!",
        },
      ],
    },
  };

  return dateInfo;
}

/**
 * Function to convert a month number to a month string.
 *
 * Example: 3 -> "March"
 *
 * @param {number} month The month number to convert
 * @returns {string|void} The month string, or if void if an invalid month number was provided
 */
function monthNumberToString(month) {
  // List of ordered months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Decrement 1 from month, as array indexes start from 0
  month--;

  // Ensure the month proided is within bounds
  if (month < 0 || month > months.length - 1) return;

  // return the month at the index that the user specified
  return months[month];
}

/**
 * What happens when the user clicks on a date on the calendar
 *
 * @param {Date} date The date object clicked
 */
function calendarDateClickEvent(date) {
  // Get the day month and year from the date object
  const day = date.getDate();
  // Increment month by 1 as date object index from 0
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Get day info from the backend
  const dayInfo = getDayInfo(day, month, year);

  // Get all the necessary elements from the page
  const modalEl = document.getElementById("calendarDayModal");
  const modalTitleEl = document.getElementById("calendarDayModalTitle");
  const modalAvailabilityEl = document.getElementById(
    "calendarDayModalAvailability",
  );
  const modalSpecialContainerEl = document.getElementById(
    "calendarDayModalSpecialContainer",
  );
  const specialsContentEl = document.getElementById("specialsContent");
  const modalBookButton = document.getElementById("calendarDayModalBookButton");

  // Create a proper date format for a title
  const formattedDate = `${day} ${monthNumberToString(month)} ${year}`;

  // Set the title of the modal to the formatted date
  modalTitleEl.textContent = formattedDate;

  // If the current day has a special event or treat
  if (dayInfo.special.hasSpecial) {
    // Show the special container
    modalSpecialContainerEl.removeAttribute("hidden");
    // Reset the HTML so its empty
    specialsContentEl.innerHTML = "";
    // Loop through each special day
    dayInfo.special.specials.forEach((special) => {
      // Display each special day in the special container
      specialsContentEl.innerHTML += `<h4>${special.specialTitle}</h4><p>${special.specialNotice}</p>`;
    });
  } else {
    // No special, hide the container
    modalSpecialContainerEl.setAttribute("hidden", "true");
  }

  // Is the selected day available
  if (dayInfo.availability.isAvailable) {
    // Set the availability notice for the current day
    modalAvailabilityEl.textContent = dayInfo.availability.notice;
    // Allow the user to book on the given day
    modalBookButton.removeAttribute("disabled");
  } else {
    // The day is fully booked, let the user know
    modalAvailabilityEl.textContent =
      "This day is already fully booked, sorry!";
    // Enable the book button
    modalBookButton.setAttribute("disabled", "true");
  }

  // If the user clicks to book, send them to the tickets page with the specific day
  // in the query parameters
  modalBookButton.addEventListener("click", () => {
    window.location = `/frontend/pages/tickets.html?d=${day}&m=${month}&y=${year}`;
  });

  // Get and show the bootstrap modal
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}
