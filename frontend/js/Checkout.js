import { getBasket, isLoggedIn } from "./Backend.js";

document.addEventListener("DOMContentLoaded", async () => {
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

  const basketData = await getBasket();
  totalPriceEl.textContent = basketData.basketTotal;

  if (await isLoggedIn()) {
    emailInputLabelEl.setAttribute("hidden", "true");
    emailInputEl.setAttribute("hidden", "true");
  } else {
    emailInputLabelEl.removeAttribute("hidden");
    emailInputEl.removeAttribute("hidden");
  }

  if (
    validEmail(emailInputEl.value) &&
    validCardNumber(cardNumberInputEl.value) &&
    validFullName(cardFullnameInputEl.value) &&
    validCardExpiry(cardExpiryInputEl.value) &&
    validCVV(cardCVVInputEl.value)
  ) {
    purchaseButtonEl.removeAttribute("disabled");
  } else {
    purchaseButtonEl.setAttribute("disabled", "true");
  }

  document.addEventListener("input", (event) => {
    if (
      validEmail(emailInputEl.value) &&
      validCardNumber(cardNumberInputEl.value) &&
      validFullName(cardFullnameInputEl.value) &&
      validCardExpiry(cardExpiryInputEl.value) &&
      validCVV(cardCVVInputEl.value)
    ) {
      purchaseButtonEl.removeAttribute("disabled");
    } else {
      purchaseButtonEl.setAttribute("disabled", "true");
    }

    if (event.target.id === "form-checkout-email") {
      if (validEmail(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    } else if (event.target.id === "form-checkout-card-number") {
      const formattedCardNumber = formatCardNumber(event.target.value);

      event.target.value = formattedCardNumber;

      if (validCardNumber(formattedCardNumber)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    } else if (event.target.id === "form-checkout-card-fullname") {
      if (validFullName(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    } else if (event.target.id === "form-checkout-card-expiry") {
      event.target.value = formatCardExpiry(event.target.value);

      if (validCardExpiry(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    } else if (event.target.id === "form-checkout-card-security") {
      if (validCVV(event.target.value)) {
        event.target.classList.remove("invalid");
      } else {
        event.target.classList.add("invalid");
      }
    }
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
  });
});

function formatCardNumber(cardNumber) {
  let value = cardNumber.replace(/\D/g, "");

  value = value.slice(0, 16);

  value = value.replace(/(.{4})/g, "$1-");

  value = value.replace(/-$/, "");

  return value;
}

function formatCardExpiry(expiry) {
  let value = expiry.replace(/\D/g, "");

  value = value.slice(0, 4);

  if (value.length >= 1 && value[0] > "1") {
    value = "0" + value[0] + value.slice(1);
  }

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

function validCardNumber(cardNumber) {
  return cardNumber.length === 19;
}

function validEmail(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
}

function validCardExpiry(expiry) {
  return expiry.length === 5;
}

function validFullName(fullname) {
  return fullname.length >= 3;
}

function validCVV(cvv) {
  return cvv.length === 3;
}
