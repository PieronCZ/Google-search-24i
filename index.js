import {modifyStartIndex, modifyUrl,startIndex, webUrl, imgUrl} from './js/variables.js';
import {elements} from './js/Elements.js';
import * as functions from './js/functions.js';

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
    functions.renderLoader(elements.loading);
    modifyUrl('webUrl', startIndex, myQuery);
    searchFor(myQuery, webUrl);
    modifyUrl('imgUrl', startIndex, myQuery);
    searchFor(myQuery, imgUrl);
  }
}

export function searchFor(myQuery, url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      elements.container.style.display = "grid";
      if (!data.items && !data.error) {
        functions.clearLoader();
        elements.container.innerHTML = `<h3>We did not find any results for: ${myQuery}</h3>`;
      } else if (data.error) {
        if (data.error.code === 429) {
          functions.clearLoader();
          elements.container.innerHTML =  `<h3>Exceeded the maximum number of queries per day :(</h3>`;
        }
        // Decide what to search for
      } else if (url === webUrl) {
        elements.resultWebHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        functions.displayWebResults(data);
        console.log('returned from web displaying');
      } else if (url === imgUrl) {
        elements.resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
        functions.displayImageResults(data);
        console.log('returned from images displaying');
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`));
    (async() => {
      const moduleSpecifier = './js/functions.js';
      const module = await import(moduleSpecifier);
      module.clearLoader();
    })();
}

// Event listeners
elements.submit.addEventListener("submit", searching);
