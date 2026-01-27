import { getBasket } from "./Backend.js";

document.addEventListener("DOMContentLoaded", async () => {
  const warningEl = document.getElementById("empty-basket-warning");
  const basketInfoContainer = document.getElementById("basket-info-container");
  const basketTotalPriceEl = document.getElementById("basket-total");
  const basketItemsContainer = document.getElementById("basket-container");
  const basketCheckoutBtn = document.getElementById("basket-checkout-btn");

  const basketItems = await getBasket();

  basketItemsContainer.innerHTML = "";
  if (basketItems.items.length) {
    warningEl.setAttribute("hidden", "true");
    basketInfoContainer.removeAttribute("hidden");
    basketTotalPriceEl.textContent = `£${basketItems.basketTotal.toFixed(2)}`;

    basketItems.items.forEach((basketItem) => {
      const formattedItemDate = basketItem.itemDate.toLocaleDateString("en-GB");

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
    warningEl.removeAttribute("hidden");
    basketInfoContainer.setAttribute("hidden", "true");
  }

  document.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() !== "button") return;

    if (event.target.id === basketCheckoutBtn.id) {
      window.location.href = "/frontend/pages/checkout.html";
    } else if (event.target.id === "remove-basket-item") {
      // Do backend call to remove said basket item
      const basketItemId = event.target.getAttribute("basket-item-id");

      alert(`Removing item with id ${basketItemId} from basket!`);

      // Grab all basket items again
      window.location.reload();

      console.log(basketItemId);
    }
  });
});
