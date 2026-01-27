import { getBasket } from "./Backend.js";

// Wait for the contents of the page to load
document.addEventListener("DOMContentLoaded", async () => {
  // Get all required elements from the document
  const warningEl = document.getElementById("empty-basket-warning");
  const basketInfoContainer = document.getElementById("basket-info-container");
  const basketTotalPriceEl = document.getElementById("basket-total");
  const basketItemsContainer = document.getElementById("basket-container");
  const basketCheckoutBtn = document.getElementById("basket-checkout-btn");

  // Get the basket from the backend
  const basketItems = await getBasket();

  // Resetthe contents of the basket items container, to prevent bugs or duplication
  basketItemsContainer.innerHTML = "";

  // If there is at least one item in the basket
  if (basketItems.items.length) {
    // Hide the "no items in basket" warning message, as the user has items in their basket
    warningEl.setAttribute("hidden", "true");

    // Show the basket total and checkout button
    basketInfoContainer.removeAttribute("hidden");

    // Set the total price of the basket
    basketTotalPriceEl.textContent = `£${basketItems.basketTotal.toFixed(2)}`;

    // Loop through each basket item
    basketItems.items.forEach((basketItem) => {
      // Get the formatted date string from a date object
      const formattedItemDate = basketItem.itemDate.toLocaleDateString("en-GB");

      // Append a formatted HTML to the basket item container
      basketItemsContainer.innerHTML += `
                <div class="basket-item">
                    <div class="basket-main">
                        <h5 class="basket-title">${basketItem.itemQuantity}x ${basketItem.itemTitle} - ${formattedItemDate}</h5>
                        <p class="basket-price">£${basketItem.itemPrice}</p>
                    </div>
                    <div class="basket-secondary">
                        <button type="button" class="btn btn-primary" id="remove-basket-item" basket-item-id="${basketItem.itemId}">
                            Remove
                        </button>
                    </div>
                </div>`;
    });
  } else {
    // No items in basket, so show warning message
    warningEl.removeAttribute("hidden");
    // Hide the basket total and checkout button
    basketInfoContainer.setAttribute("hidden", "true");
  }

  // User clicked on something
  document.addEventListener("click", (event) => {
    // If the user did not click on a button,
    if (event.target.tagName.toLowerCase() !== "button") return;

    if (event.target.id === basketCheckoutBtn.id) {
      window.location.href = "/frontend/pages/checkout.html";
    } else if (event.target.id === "remove-basket-item") {
      // Do backend call to remove said basket item
      const basketItemId = event.target.getAttribute("basket-item-id");

      alert(`Removing item with id ${basketItemId} from basket!`);

      // Refresh the webpage to reload all basket items
      window.location.reload();
    }
  });
});
