import { getBasket, isLoggedIn } from "./Backend.js";

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Get all the required elements
  const totalPriceEl = document.getElementById("total-price");

  const emailInputLabelEl = document.getElementById(
    "form-checkout-email-label",
  );
  const emailInputEl = document.getElementById("form-checkout-email");
  const cardNumberInputEl = document.getElementById(
    "form-checkout-card-number",
  );
  const cardFullnameInputEl = document.getElementById(
    "form-checkout-card-fullname",
  );
  const cardExpiryInputEl = document.getElementById(
    "form-checkout-card-expiry",
  );
  const cardCVVInputEl = document.getElementById("form-checkout-card-security");

  const purchaseButtonEl = document.getElementById("purchase-submit-button");

  // Get the basket from the current user
  const basketData = await getBasket();

  // Set the total price of the checkout to the total price from the basket
  totalPriceEl.textContent = basketData.basketTotal;

  // If the user is logged in, hide the email input, otherwise require it
  if (await isLoggedIn()) {
    emailInputLabelEl.setAttribute("hidden", "true");
    emailInputEl.setAttribute("hidden", "true");
  } else {
    emailInputLabelEl.removeAttribute("hidden");
    emailInputEl.removeAttribute("hidden");
  }

  // Wait for user to enter a key into an input
  document.addEventListener("input", async (event) => {
    // If all inputs are valid, enable the purchase button, otherwise don't
    if (
      (validEmail(emailInputEl.value) || (await isLoggedIn())) &&
      validCardNumber(cardNumberInputEl.value) &&
      validFullName(cardFullnameInputEl.value) &&
      validCardExpiry(cardExpiryInputEl.value) &&
      validCVV(cardCVVInputEl.value)
    ) {
      purchaseButtonEl.removeAttribute("disabled");
    } else {
      purchaseButtonEl.setAttribute("disabled", "true");
    }

    // Email input validation
    if (event.target.id === "form-checkout-email") {
      if (validEmail(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
      // Long card number validation
    } else if (event.target.id === "form-checkout-card-number") {
      const formattedCardNumber = formatCardNumber(event.target.value);

      event.target.value = formattedCardNumber;

      if (validCardNumber(formattedCardNumber)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
      // Card full name validation
    } else if (event.target.id === "form-checkout-card-fullname") {
      if (validFullName(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
      // Card expiry validation
    } else if (event.target.id === "form-checkout-card-expiry") {
      event.target.value = formatCardExpiry(event.target.value);

      if (validCardExpiry(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
      // Card security validation
    } else if (event.target.id === "form-checkout-card-security") {
      if (validCVV(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    }
  });

  // Wait for the user to press "purchase"
  document.addEventListener("submit", (event) => {
    // Ensure the page doesnt reload when the user submits
    event.preventDefault();

    // Get the form data as a FormData object
    const formData = new FormData(event.target);

    // Backend magic
  });
});

/**
 * Function to accept a card number string, and format it
 *
 * @param {string} cardNumber
 * @returns {string}
 */
function formatCardNumber(cardNumber) {
  let value = cardNumber.replace(/\D/g, "");

  value = value.slice(0, 16);

  value = value.replace(/(.{4})/g, "$1-");

  value = value.replace(/-$/, "");

  return value;
}

/**
 * Function to accept a card expiry string, and format it
 *
 * @param {string} expiry
 * @returns {string}
 */
function formatCardExpiry(expiry) {
  // Only allows numbers in the strng
  let value = expiry.replace(/\D/g, "");

  // Only allow 4 characters in the string
  value = value.slice(0, 4);

  // Add support for single digit months, (such as "1")
  if (value.length >= 1 && value[0] > "1") {
    value = "0" + value[0] + value.slice(1);
  }

  // Insert a slash into the result for formatting.
  if (value.length >= 2) {
    const month = parseInt(value.slice(0, 2), 10);
    if (month == 0) value = "01" + value.slice(2);
    if (month > 12) value = "12" + value.slice(2);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
  }

  return value;
}

/**
 * Is the provided card number a valid card number
 *
 *
 * This only checks for length as the above code already checks for the specific card number
 *
 * @param {string} cardNumber
 * @returns {boolean}
 */
function validCardNumber(cardNumber) {
  return cardNumber.length === 19;
}

/**
 * Is the provided email a valid email address, based of a regex pattern
 *
 * @param {string} email
 * @returns {boolean}
 */
function validEmail(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
}

/**
 * Is the expiry of the card valid
 *
 *
 * Only checks for length because the above code managed format
 *
 * @param {string} expiry
 * @returns {boolean}
 */
function validCardExpiry(expiry) {
  return expiry.length === 5;
}

/**
 * Is the full name on the card valid
 *
 * @param {string} fullname
 * @returns {boolean}
 */
function validFullName(fullname) {
  return fullname.length >= 3;
}

/**
 * Is the CVV on the card valid
 *
 * @param {string} cvv
 * @returns {boolean}
 */
function validCVV(cvv) {
  return cvv.length === 3;
}
