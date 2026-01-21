/**
 * A function to dynamically insert information data into an info bar.
 *
 * @param {[{title: string, desc: string}]} info Example: [{title: "Benefits", desc: "There are ple..."}]
 */
export function displayInfoBar(info = []) {
  const factContainerEl = document.getElementById("factInfoContainer");

  info.forEach((fact) => {
    factContainerEl.innerHTML += `<hr /><h2>${fact.title}</h2><p>${fact.desc}</p>`;
  });
}
