import { isLoggedIn } from "./Backend.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (await isLoggedIn()) window.location.href = "/frontend/index.html";

  // Get all login input elements
  const loginEmailInput = document.getElementById("form-login-email");
  const loginPasswordInput = document.getElementById("form-login-password");
  const loginButton = document.getElementById("login-button");

  // Get all registration input elements
  const registerEmailInput = document.getElementById("form-register-email");
  const registerPasswordInput = document.getElementById(
    "form-register-password",
  );
  const registerFNameInput = document.getElementById("form-register-fname");
  const registerLNameInput = document.getElementById("form-register-lname");
  const registerButton = document.getElementById("register-button");

  // A small message that shows the reason for password invalidity (if applicable)
  const invalidPasswordMessage = document.getElementById(
    "invalid-password-error",
  );

  // Real-time validation, check when a user types in a textbox
  document.addEventListener("input", (event) => {
    // These two functions check all respective textboxes and determine whether they are all valid
    // and whether should its button be enabled or not
    validateLoginButton(loginEmailInput, loginPasswordInput, loginButton);
    validateRegisterButton(
      registerEmailInput,
      registerPasswordInput,
      registerFNameInput,
      registerLNameInput,
      registerButton,
    );

    // Loop through each textbox and determine which is being typed into
    // And validate it in real time
    switch (event.target.id) {
      case "form-login-email":
        displayValid(isValidEmail(event.target.value), event.target);
        break;
      case "form-login-password":
        displayValid(event.target.value.length > 0, event.target);
        break;
      case "form-register-email":
        displayValid(isValidEmail(event.target.value), event.target);
        break;
      case "form-register-password":
        const valid = isValidPassword(event.target.value);
        displayValid(valid.overall, event.target);
        showPasswordCallout(valid.specific, invalidPasswordMessage);
        break;

      case "form-register-fname":
        displayValid(isValidName(event.target.value), event.target);
        break;

      case "form-register-lname":
        displayValid(isValidName(event.target.value), event.target);
        break;
    }
  });

  //  This script will manage login and registration based on the form submission

  document.addEventListener("submit", (event) => {
    // Create a FormData object to store the data in a more orderly manner
    const form = new FormData(event.target);

    // Login and registration both use different routes, so we check for that
    if (event.target.id === "login-form") {
      // Login magic
    } else if (event.target.id === "register-form") {
      // Register magic
    }
  });
});

/**
 * Function that checks whether all login inputs are valid, and enables/disables the login button accordingly
 *
 * @param {Element} emailEl
 * @param {Element} passwordEl
 * @param {Element} loginButtonEl
 */
function validateLoginButton(emailEl, passwordEl, loginButtonEl) {
  if (isValidEmail(emailEl.value) && passwordEl.value.length > 0) {
    loginButtonEl.removeAttribute("disabled");
  } else {
    loginButtonEl.setAttribute("disabled", "true");
  }
}

/**
 * Function that checks whether all register inputs are valid, and enables/disables the register button accordingly
 *
 * @param {Element} emailEl
 * @param {Element} passwordEl
 * @param {Element} fnameEl
 * @param {Element} lnameEl
 * @param {Element} registerButtonEl
 */
function validateRegisterButton(
  emailEl,
  passwordEl,
  fnameEl,
  lnameEl,
  registerButtonEl,
) {
  if (
    isValidEmail(emailEl.value) &&
    isValidPassword(passwordEl.value) &&
    isValidName(fnameEl.value) &&
    isValidName(lnameEl.value)
  ) {
    registerButtonEl.removeAttribute("disabled");
  } else {
    registerButtonEl.setAttribute("disabled", "true");
  }
}

/**
 * Shows a small message that tells the user what is invalid in their password entry
 *
 * @param {{char_count: boolean, has_capital: boolean, has_number: boolean, has_special: boolean}} data
 * @param {Element} messageEl
 */
function showPasswordCallout(data, messageEl) {
  if (!data.char_count) {
    messageEl.textContent = "At least 11 characters";
  } else if (!data.has_number) {
    messageEl.textContent = "Must contain 1+ numbers";
  } else if (!data.has_capital) {
    messageEl.textContent = "Must contain 1+ capital letters";
  } else if (!data.has_special) {
    messageEl.textContent = "Must contain 1+ special characters";
  } else {
    messageEl.textContent = "";
  }
}

/**
 * This function adds or removes an "invalid" class to `el` based on `isValid`
 *
 * @param {boolean} isValid Whether the input of the user is valid
 * @param {Element} el The element to modify
 */
function displayValid(isValid, el) {
  isValid ? el.classList.remove("invalid") : el.classList.add("invalid");
}

/**
 * Function that returns `true` if the email input is valid, `false` otherwise
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
}

function isValidName(name) {
  return name.length >= 3 && /^[A-Za-z]+$/.test(name);
}

/**
 * Function that checks whether a provided password string meets the required password criteria.
 *
 * @param {string} password
 * @returns {{overall: boolean, specific: {char_count: boolean, has_capital: boolean, has_number: boolean, has_special: boolean}}}
 */
function isValidPassword(password) {
  const data = {
    overall: false,
    specific: {
      char_count: false,
      has_capital: false,
      has_number: false,
      has_special: false,
    },
  };

  data.specific.char_count = password.length >= 11;

  for (const char of password) {
    if (!data.specific.has_capital)
      data.specific.has_capital = char >= "A" && char <= "Z";
    if (!data.specific.has_number)
      data.specific.has_number = /^[0-9]$/.test(char);
    if (!data.specific.has_special)
      data.specific.has_special = /[^a-zA-Z0-9 ]/.test(char);
  }

  data.overall =
    data.specific.char_count &&
    data.specific.has_capital &&
    data.specific.has_number &&
    data.specific.has_special;
  return data;
}
