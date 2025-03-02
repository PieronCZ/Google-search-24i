import { elements } from "./Elements.js";
import { searchFor, myQuery } from "../index.js";
import {
  modifyStartIndex,
  modifyUrl,
  startIndex,
  webUrl,
  imgUrl,
} from "./variables.js";

export default "Pagination Export";

// Pagination
export function paginationCheck(data, webOrImg) {
  let pagination;
  if (webOrImg === "web") {
    pagination = elements.paginationWeb;
  } else {
    pagination = elements.paginationImg;
  }

  // check if there is next/previous page
  if (data.queries.nextPage || data.queries.previousPage) {
    pagination.innerHTML = `
     ${
       data.queries.previousPage
         ? `<button onclick="getMoreResults('${data.queries.previousPage[0].startIndex}','${webOrImg}')">Prev</button>
         <script type="module">import {getMoreResults} from './js/Pagination.js'; </script>`
         : ""
     }
     ${
       data.queries.nextPage
         ? `<button onclick="getMoreResults('${data.queries.nextPage[0].startIndex}','${webOrImg}')">Next</button>
         <script type="module">import {getMoreResults} from './js/Pagination.js'; </script>`
         : ""
     }`;
  } else {
    pagination.innerHTML = "";
  }
}

// Search for pagination results
export function getMoreResults(index, choice) {
  modifyStartIndex(index);
  if (choice === "web") {
    modifyUrl("webUrl", startIndex, myQuery);
    elements.loading.style.display = "flex";
    searchFor(myQuery, webUrl);
  } else {
    modifyUrl("imgUrl", startIndex, myQuery);
    elements.loading.style.display = "flex";
    searchFor(myQuery, imgUrl);
  }
}
// Make getMoreResults global
window.getMoreResults = getMoreResults;
