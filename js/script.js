// Creating constants
const search = document.getElementById("search"),
  submit = document.getElementById("submit"), // search bar enter or button press
  resultImgHeading = document.getElementById("result-img-heading"),
  resultTxtHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  container = document.getElementById("container");
  pagination = document.getElementById('pagination');

  // Search for keyword and fetch from API
function searching(e) {
  e.preventDefault();

  const myQuery = search.value;
  if (myQuery.trim()) {
    webResults(myQuery);
    imageResults(myQuery);
  } else {
    console.log("type smth");
  }
}

function webResults(myQuery){
  try {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&q=${myQuery}`
    )
      .then((res) => res.json()) // catch promise
      .then((data) => { // catching second promise
        console.log(data);
        resultTxtHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        if (!data.items) {
          container.innerHTML = `<h3>It seems there is nothink you are looking for...</h3>`;
        } else {
          resultsEl.innerHTML = data.items
            .map((item) =>
                `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
                      <p><a href="${item.link}">${item.link}</a></p>
                      <p>${item.htmlSnippet}</p>`
            ).join("");
            let nextResIndex = toString(data.queries.nextPage.startIndex);
            console.log(nextResIndex);
            // pagination.innerHTML = `<li class="page-item"><a class="page-link" href="https://www.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=4&q=${myQuery}">Previous</a></li>
            //     <li class="page-item"><a class="page-link" href="">Next</a></li>`
        }
      });
  } catch (ex) {
    console.log(ex);
  }
}

function imageResults(myQuery){
  try{
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&num=9&searchType=image&q=${myQuery}`
    )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
      if(!data.items){
         container.innerHTML =  `<h3>It seems there is nothink you are looking for...</h3>`;
      }else{
        imagesEl.innerHTML = data.items.map(img => `<a href="${img.image.contextLink}"><img src="${img.link}" /></a>`).join('');
      }
    })
  }catch(ex){
    console.log(ex);
  }
  
}

// Event listeners
submit.addEventListener("submit", searching);
