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
    redirect: "none",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const adContainer = document.getElementById("advertisement-container");

  // Here fetch ads from api

  getRandomItems(templateAd, 2).forEach((ad) => {
    const content = adBoxHTMLGenerator(ad);

    adContainer.innerHTML += content;
  });
});

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
            <button dest="${
              ad_content.redirect
            }" class="ad-container-button" type="button">
              Take me there!
            </button>
          </div>
  `;
}

function getRandomItems(arr, n) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}
