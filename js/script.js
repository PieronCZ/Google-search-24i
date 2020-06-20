const retryBtn = document.getElementById("retry"),
  closeBtn = document.getElementById("close");

// Getting query and passing it to a function, that is responsible for fetching and displaying results
function searching(e) {
  e.preventDefault();
  myQuery = search.value; // storing query in the variable myQuery

  if (!myQuery.trim()) {
    // deleting white spaces and checking if there is a query in the search bar
    console.log("nothing to search");
  } else {
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&q=${myQuery}`;
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=9&searchType=image&q=${myQuery}`;
    doesConnectionExist();
    searchFor(myQuery, webUrl); // Using url as variables i can use the same functions for searching images and results
    searchFor(myQuery, imgUrl);
  }
}

// Universal function for searching web and images
function searchFor(myQuery, url) {
  fetch(url)
    .then((res) => res.json()) // catch promise
    .then((data) => {
      // catching second promise
      console.log("fetch returned"); // for debugging purposes
      console.log(data);
      container.style.display = "grid"; // show container
      if (!data.items && !data.error) {
        container.innerHTML = notFoundTxt; // query not found message
      } else if (data.error) {
        if (data.error.code === 429) {
          container.innerHTML = maxQueriesTxt; // displaying max queries limit per day exceeded
        }
        // Decide what to search for
      } else if (url === webUrl) {
        resultWebHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        displayWebResults(data);
      } else if (url === imgUrl) {
        resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
        displayImageResults(data);
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`)); // catching errors while fetching
  console.log("finish"); // for debugging purposes
}

// Event listeners
submit.addEventListener("submit", searching); // enter or click on button
retryBtn.addEventListener("click", (e) => {
  // internet error popup retry button
  searching(e); // try to search again
  popup.style.display = "none"; // and hide popup
});
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
