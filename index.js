import {
  modifyStartIndex,
  modifyUrl,
  startIndex,
  webUrl,
  imgUrl,
} from "./js/variables.js";
import { elements } from "./js/Elements.js";
import * as functions from "./js/functions.js";

export default "Index export";
export let myQuery;

// Search control
function searching(e) {
  e.preventDefault();
  myQuery = functions.escapeRegex(elements.search.value);
  modifyStartIndex(0);

  // Check if there is query
  if (!myQuery.trim()) {
  } else {
    modifyUrl("webUrl", startIndex, myQuery);
    elements.loading.style.display = "flex";
    searchFor(myQuery, webUrl);
    modifyUrl("imgUrl", startIndex, myQuery);
    elements.loading.style.display = "flex";
    searchFor(myQuery, imgUrl);
  }
}

// Fetch from api, put results to appropriate container
export function searchFor(myQuery, url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      elements.container.style.display = "grid";

      // Errors handilng
      if (!data.items && !data.error) {
        elements.loading.style.display = "none";
        elements.container.innerHTML = `<h3>We did not find any results for: ${myQuery}</h3>`;
      } else if (data.error) {
        if (data.error.code === 429) {
          elements.loading.style.display = "none";
          elements.container.innerHTML = `<h3>Exceeded the maximum number of queries per day :(</h3>`;
        }

        // Decide what to search for
      } else if (url === webUrl) {
        elements.resultWebHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        functions.displayWebResults(data);
        elements.loading.style.display = "none";
      } else if (url === imgUrl) {
        elements.resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
        functions.displayImageResults(data);
        elements.loading.style.display = "none";
      }
    })
    // Catching fetch errors
    .catch((reason) => {
      elements.loading.style.display = "none";
      elements.container.style.display = "grid";
      elements.container.innerHTML = `<h3>Can't search for results... Check Your internet connection</h3>`;
      console.log(`Fetch failed because ${reason}`);
    });
}

// Event listeners
elements.submit.addEventListener("submit", searching);
