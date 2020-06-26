import { elements } from "./Elements.js";
import { paginationCheck } from "./Pagination.js";

export default "Export from functions";

// Display web results
export function displayWebResults(data) {
  elements.resultsEl.innerHTML = data.items
    .map(
      (item) =>
        `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
          <p><a class="link" href="${item.link}">${item.link}</a></p>    
          <p>${item.htmlSnippet}</p>`
    )
    .join("");

  paginationCheck(data, "web");
}

// Display image results
export function displayImageResults(data) {
  elements.imagesEl.innerHTML = data.items
    .map(
      (item) =>
        `<a href="${item.image.contextLink}"><img src="${item.link}" /></a>`
    )
    .join("");

  paginationCheck(data, "img");
}

// escaping search query
export function escapeRegex(query) {
  return query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
