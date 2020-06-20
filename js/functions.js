// Function for mapping through web results and displaing them for user
function displayWebResults(data) {
  resultsEl.innerHTML = data.items
    .map(
      (item) =>
        `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
          <p><a class="link" href="${item.link}">${item.link}</a></p>    
          <p>${item.htmlSnippet}</p>` // Snippet from searched site
    )
    .join(""); // return array as a string
    
    paginationCheck(data, 'web');
}

// Function for mapping through image results and displaying them for user
function displayImageResults(data) {
  imagesEl.innerHTML = data.items
    .map(
      (item) =>
        `<a href="${item.image.contextLink}"><img src="${item.link}" /></a>` // display an image and use it as the link for its source
    )
    .join("");

    paginationCheck(data, 'img');
}

// Pagination check
function paginationCheck(data, webOrImg){
  // Check if web or img
  if(webOrImg === 'web'){
    pagination = paginationWeb;
  }else{
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
function getMoreResults(startIndex,choice) {
  doesConnectionExist();
  if(choice === 'web'){
     webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&start=${startIndex}&q=${myQuery}`;
    searchFor(myQuery, webUrl);
  }else{
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=9&searchType=image&start=${startIndex}&q=${myQuery}`;
    searchFor(myQuery, imgUrl);
  }
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
