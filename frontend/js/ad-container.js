const templateAd = [
  {
    title: "Offer!",
    description:
      "Gain up to 10% off when purchasing multiple tickets on weekdays!",
    image: "https://picsum.photos/200/300",
    redirect: "none",
  },
  {
    title: "Weekly Bingo",
    description:
      "We now offer free bingo sessions for all customers!</br>Every Friday @ 4:00pm",
    image: "",
  },
];

// Ensure all elements are loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the ad container div, this is where all ads will be
  const adContainer = document.getElementById("advertisement-container");

  // Here fetch ads from api

  // Get two random ads, and loop through each one
  getRandomItems(templateAd, 2).forEach((ad) => {
    // Get the formatted HTML for that ad
    const content = adBoxHTMLGenerator(ad);

    // Append the HTML for that ad into the container's existing HTML
    adContainer.innerHTML += content;
  });
});

/**
 * A function to generate a formatted HTML string from an ad_content object.
 *
 * @param {{title: string, description: string, image?: string, redirect: string}} ad_content The ad data to insert into the HTML
 * @returns {string} formatted HTML string ready to be injected.
 */
function adBoxHTMLGenerator(ad_content) {
  return `
            <div class="ad-container-outer">
            <h1 class="ad-container-title">${ad_content.title}</h1>
            <p class="ad-container-text">
              ${ad_content.description}
            </p>
            ${
              ad_content.image
                ? `<img
              class="ad-container-button"
              src="${ad_content.image}"
              alt="${ad_content.title}"
            />`
                : ""
            }
            ${
              ad_content.redirect
                ? `<button dest="${ad_content.redirect}" class="ad-container-button" type="button">
              Take me there!
            </button>`
                : ""
            }
          </div>
  `;
}

/**
 * Function to get a set amount of random unique items inside of an array.
 *
 * This works by creating a copy of `arr` and shuffling it, then returning `n` items.
 *
 * @param {Array} arr The array to get items from
 * @param {number} n The amount of items to get
 * @returns {Array} Array[n] An array with `n` amount of items
 */
function getRandomItems(arr, n) {
  // Create a copy of the array to prevent modification of items in the original array
  const shuffled = [...arr];
  // Loop through each item in the array, backwards, this loop shuffles the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Get a random index in the array
    const j = Math.floor(Math.random() * (i + 1));
    // Flip the values of the two indexes
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Returns the items from first to n of the array
  return shuffled.slice(0, n);
}
