var imgSrc = {
  liver: "../img/liver.png",
  stomach: "../img/stomach.png",
  heart: "../img/heart.png",
  lungs: "../img/lungs.png",
  brain: "../img/brain.png",
  mouth: "../img/mouth.png",
};

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let part = params.part;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

document.getElementById("title").innerText = toTitleCase(part);

document.getElementById("imgSrc").src = imgSrc[part];
document.getElementById("imgSrc").setAttribute("alt", part);

axios
  .post(`./moreinfo?part=${part}`)
  .then((response) => {
    document.getElementById("content").innerHTML = ""
    for (var [link, linkDict] of Object.entries(response.data)) {
      console.log(link);
      document.getElementById("content").innerHTML += `
      <a class="d-flex flex-column border-3 p-3 rounded-4 border border-dark-subtle text-black text-decoration-none hover" href="${link}" target="_blank">
          <h5 class="text-center">${linkDict["title"]}</h5>
          <p class="my-2">
            ${linkDict["summary"]}
          </p>
        </a>`;
    }
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
