// Creating constants
const search = document.getElementById("search"),
  submit = document.getElementById("submit"), // search bar enter or button press
  resultImgHeading = document.getElementById("result-img-heading"),
  resultTxtHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  retryBtn = document.getElementById("retry"),
  popup = document.getElementById("popup-container"),
  pagination = document.getElementById("pagination"),
  container = document.getElementById("container");

var webUrl;

// Search for keyword and fetch from API
function searching(e) {
  e.preventDefault();
  const myQuery = search.value;

  if (!myQuery.trim()) {
    console.log("nothing to search");
  } else {
    doesConnectionExist();
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&q=${myQuery}`;
    webResults(myQuery, webUrl);
    imageResults(myQuery);
  }
}

function webResults(myQuery, url) {
  container.style.display = "grid";
  fetch(url)
    .then((res) => res.json()) // catch promise
    .then((data) => {
      // catching second promise
      console.log("fetch returned");
      console.log(data);
      resultTxtHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
      if (!data.items) {
        container.innerHTML = `<h3>We couldn't find any results under: ${myQuery}</h3>`;
      } else {
        resultsEl.innerHTML = data.items
          .map(
            (item) =>
              `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
                            <p><a href="${item.link}">${item.link}</a></p>
                            <p>${item.htmlSnippet}</p>`
          )
          .join("");

        // check if there is next page - pagination ${previous > 0 ? `<button onclick="getMoreResults('${previous}','${myQuery}')">Prev</button>` : ''}
        if (data.queries.nextPage) {
          let startIndex = data.queries.nextPage.startIndex;
          let previous = startIndex - 4;
          pagination.innerHTML = `
            
            ${
              data.queries.nextPage
                ? `<button onclick="getMoreResults('${startIndex}','${myQuery}')">Next</button>`
                : ""
            }`;
        } else {
          pagination.innerHTML = "";
        }
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`));
  console.log("finish");
}

function getMoreResults(startIndex, query) {
  webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&start=${startIndex}&q=${query}`;
  webResults(query, webUrl);
}

function imageResults(myQuery) {
  container.style.display = "grid";
  fetch(
    `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=9&searchType=image&q=${myQuery}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("fetch returned");
      console.log(data);
      resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
      if (!data.items) {
        container.innerHTML = `<h3>We did not find any results</h3>`;
      } else {
        imagesEl.innerHTML = data.items
          .map(
            (img) =>
              `<a href="${img.image.contextLink}"><img src="${img.link}" /></a>`
          )
          .join("");
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`));
  console.log("finish");
}

// Check internet connection
function doesConnectionExist() {
  var xhr = new XMLHttpRequest();
  var file = "https://pieroncz.github.io/website/"; // Link to hosted random project on my Github which I am sure exist
  var randomNum = Math.round(Math.random() * 10000);

  xhr.open("HEAD", file + "?rand=" + randomNum, true);
  console.log(xhr.response);
  xhr.send();

  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 304) {
        // out of that range something is going wrong
        console.log("connection exists!");
        return true;
      } else {
        console.log("connection doesn't exist!");
        popup.style.display = "flex";
        return false;
      }
    }
  }
}

// Event listeners
submit.addEventListener("submit", searching);
retryBtn.addEventListener("click", (e) => {
  searching(e);
  popup.style.display = "none";
});
