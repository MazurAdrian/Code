document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    navLinks: true,
    navLinkDayClick: function (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dayInfo = getDayInfo(day, month, year);

      const modalEl = document.getElementById("calendarDayModal");
      const modalTitleEl = document.getElementById("calendarDayModalTitle");
      const modalAvailabilityEl = document.getElementById(
        "calendarDayModalAvailability",
      );
      const modalSpecialContainerEl = document.getElementById(
        "calendarDayModalSpecialContainer",
      );
      const specialsContentEl = document.getElementById("specialsContent");
      const modalBookButton = document.getElementById(
        "calendarDayModalBookButton",
      );

      const formattedDate = `${day} ${monthNumberToString(month)} ${year}`;

      modalTitleEl.textContent = formattedDate;
      if (dayInfo.special.hasSpecial) {
        modalSpecialContainerEl.removeAttribute("hidden");
        specialsContentEl.innerHTML = ""; // Reset the HTML so its empty
        dayInfo.special.specials.forEach((special) => {
          specialsContentEl.innerHTML += `<h4>${special.specialTitle}</h4><p>${special.specialNotice}</p>`;
        });
      } else {
        modalSpecialContainerEl.setAttribute("hidden", "true");
      }

      if (dayInfo.availability.isAvailable) {
        modalAvailabilityEl.textContent = dayInfo.availability.notice;
        modalBookButton.removeAttribute("disabled");
      } else {
        modalAvailabilityEl.textContent =
          "This day is already fully booked, sorry!";
        modalBookButton.setAttribute("disabled", "true");
      }

      modalBookButton.addEventListener("click", () => {
        alert(
          `One day in the near future, this will send you to the checkout page for a certain day (${formattedDate})`,
        );
      });

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    },
  });
  calendar.render();
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

  month--;

  if (month < 0 || month > months.length - 1) return;

  return months[month];
}
