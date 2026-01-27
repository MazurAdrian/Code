const animals = [
  {
    name: "Zebra",
    img: "https://picsum.photos/200",
    desc: "This is a very cool zebra and we have lots of them!",
  },
  {
    name: "Zebra",
    img: "https://picsum.photos/200",
    desc: "This is a very cool zebra and we have lots of them!",
  },
  {
    name: "Zebra",
    img: "https://picsum.photos/200",
    desc: "This is a very cool zebra and we have lots of them!",
  },
];

// Wait for the page contents to load
document.addEventListener("DOMContentLoaded", () => {
  // Get the container that will house animal data
  const animalsContainer = document.getElementById("animals-container");

  // Empty the contents of the animal container, preventing bugs or duplicated data
  animalsContainer.innerHTML = "";

  // Loop though each animal object
  animals.forEach((animal) => {
    // Append HTML data for the animal into the animals container
    animalsContainer.innerHTML += `
        <div class="card" style="width: 18rem">
            <img src="${animal.img}" alt="${animal.name}" />
            <div class="card-body">
                <h5 class="card-title">${animal.name}</h5>
                <p class="card-text">${animal.desc}</p>
            </div>
        </div>`;
  });
});
