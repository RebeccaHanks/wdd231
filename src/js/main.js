import { getParkData, parkInfoLinks } from "./parkService.mjs";

const parkData = getParkData();

function setHeaderInfo(data) {
// insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a")
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
// update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = data.fullName;
// set the banner image
    document.querySelector(".hero-banner > img").src = data.images[0].url;
// use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}
// setHeaderInfo();

function setIntroInfo(data) {
    const intro = document.querySelector("main > .intro");
    intro.innerHTML = `<h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>`;
}


function mediaCardTemplate(info) {
    return `
    <div class="media-card">
    <a href="${info.link}>
    <img src="${info.image}" alt="${info.name}" class="media-card__img">
    <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
    </div>`;
}


function setParkInfoLinks(data) {
    const infoEL = document.querySelector(".info");
      // we have multiple links to build...so we map to transform the array of objects into an array of HTML strings.
    const html = data.map(mediaCardTemplate);
      // join the array of strings into one string and insert it into the section
    infoEL.innerHTML = html.join("");
}

function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}

function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "voice");
    return voice.phoneNumber;
}

export function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}<p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>
    `;
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.insertAdjacentHTML("afterbegin", footerTemplate(data));
}

export default function setHeaderFooter(parkData) {
  setHeaderInfo(parkData);
  setFooter(parkData);
}

setHeaderInfo(parkData);
setIntroInfo(parkData);
setParkInfoLinks(parkInfoLinks);
setFooter(parkData);
