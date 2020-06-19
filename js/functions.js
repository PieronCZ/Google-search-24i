function displayWebResults(data) {
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

function displayImageResults(data) {
  imagesEl.innerHTML = data.items
    .map(
      (item) =>
        `<a href="${item.image.contextLink}"><img src="${item.link}" /></a>`
    )
    .join("");
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
