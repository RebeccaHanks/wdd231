import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
const parkData = getParkData();


function setParkIntro(data) {
    const intro = document.querySelector("main > .intro");
    intro.innerHTML = `<h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>`;
}

function setParkInfoLinks(data) {
    const infoEL = document.querySelector(".info");
      // we have multiple links to build...so we map to transform the array of objects into an array of HTML strings.
    const html = data.map(mediaCardTemplate);
      // join the array of strings into one string and insert it into the section
    infoEL.innerHTML = html.join("");
}

async function init() {
const parkData = await getParkData();

setHeaderInfo(parkData);
setIntroInfo(parkData);
setParkInfoLinks(parkInfoLinks);
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();
// setFooter(parkData);
