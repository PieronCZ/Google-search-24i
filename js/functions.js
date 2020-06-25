// Function for mapping through web results and displaing them for user
function displayWebResults(data) {
  resultsEl.innerHTML = data.items
    .map(
      (item) =>
        `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
          <p><a class="link" href="${item.link}">${item.link}</a></p>    
          <p>${item.htmlSnippet}</p>`
    )
    .join(""); // return array as a string

  paginationCheck(data, "web");
}

// Function for mapping through image results and displaying them for user
function displayImageResults(data) {
  imagesEl.innerHTML = data.items
    .map(
      (item) =>
        `<a href="${item.image.contextLink}"><img src="${item.link}" /></a>` 
    )
    .join("");

  paginationCheck(data, "img");
}

// Pagination
function paginationCheck(data, webOrImg) {
  if (webOrImg === "web") {
    pagination = paginationWeb;
  } else {
    pagination = paginationImg;
  }
  // check if there is next page - pagination
  if (data.queries.nextPage || data.queries.previousPage) {
    pagination.innerHTML = `
     ${
       data.queries.previousPage
         ? `<button onclick="getMoreResults('${data.queries.previousPage[0].startIndex}','${webOrImg}')">Prev</button>`
         : ""
     }
     ${
       data.queries.nextPage
         ? `<button onclick="getMoreResults('${data.queries.nextPage[0].startIndex}','${webOrImg}')">Next</button>`
         : ""
     }`;
  } else {
    pagination.innerHTML = "";
  }
}

// search for pagination results
function getMoreResults(startIndex, choice) {
  if (choice === "web") {
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=4&start=${startIndex}&q=${myQuery}`;
    renderLoader(loadingWeb);
    searchFor(myQuery, webUrl);
  } else {
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=9&searchType=image&start=${startIndex}&q=${myQuery}`;
    renderLoader(loadingImg);
    searchFor(myQuery, imgUrl);
  }
}

// escaping search query
function escapeRegex(query){
  return query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Loading state on
const renderLoader = parent => {
  const loader =`
    <div class="loader">
      <svg>
        <use href="img/loader.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
}

// Loading state off
const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if(loader){
    loader.parentElement.removeChild(loader);
  }
};