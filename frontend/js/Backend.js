/**
 * Is the current user logged in
 *
 * @returns {Promise<boolean>}
 */
export async function isLoggedIn() {
  return true;
}

/**
 * Function to get the current users basket
 *
 * @returns {Promise<{basketTotal: number, items: [
 * {
 *    itemId: number
 *    itemTitle: string
 *    itemQuantity: number
 *    itemPrice: number
 *    itemDate: Date
 * }]}>}
 */
export async function getBasket() {
  const basketContentsTemp = {
    basketTotal: 39.99,
    items: [
      {
        itemId: 1,
        itemTitle: "MyItem",
        itemQuantity: 1,
        itemPrice: 12.88,
        itemDate: new Date(),
      },
      {
        itemId: 1,
        itemTitle: "MyItem",
        itemQuantity: 1,
        itemPrice: 12.88,
        itemDate: new Date(),
      },
    ],
  };

  // API call for basket

  return basketContentsTemp;
}
