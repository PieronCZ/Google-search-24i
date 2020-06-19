// Creating constants
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  resultImgHeading = document.getElementById("result-img-heading"),
  resultTxtHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  retryBtn = document.getElementById("retry"),
  popup = document.getElementById("popup-container"),
  pagination = document.getElementById("pagination"),
  container = document.getElementById("container");

// Getting query and passing it to a function, that is responsible for fetching and displaying results
function searching(e) {
  e.preventDefault();
  myQuery = search.value;

  if (!myQuery.trim()) {
    console.log("nothing to search");
  } else {
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&q=${myQuery}`;
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=9&searchType=image&q=${myQuery}`;
    doesConnectionExist();
    searchFor(myQuery, webUrl);
    searchFor(myQuery, imgUrl);
  }
}

function searchFor(myQuery, url) {
  container.style.display = "grid";
  fetch(url)
    .then((res) => res.json()) // catch promise
    .then((data) => {
      // catching second promise
      console.log("fetch returned");
      console.log(data);
      resultTxtHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
      if (!data.items && !data.error) {
        container.innerHTML = notFoundTxt;
      } else if (data.error.code === 429) {
        container.innerHTML = maxQueriesTxt;
      } else if (url === webUrl) {
        displayWebResults(data);
      } else if (url === imageUrl) {
        displayImageResults(data);
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`));
  console.log("finish");
}

// Pagination results
function getMoreResults(startIndex, query) {
  webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&start=${startIndex}&q=${query}`;
  searchFor(query, webUrl);
}

// Event listeners
submit.addEventListener("submit", searching);
retryBtn.addEventListener("click", (e) => {
  searching(e);
  popup.style.display = "none";
});
