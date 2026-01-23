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

document.addEventListener("DOMContentLoaded", () => {
  const animalsContainer = document.getElementById("animals-container");

  animalsContainer.innerHTML = "";

  animals.forEach((animal) => {
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
