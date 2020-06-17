// Creating constants
const search = document.getElementById("search"),
  submit = document.getElementById("submit"), // search bar enter or button press
  resultImgHeading = document.getElementById("result-img-heading"),
  resultTxtHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  container = document.getElementsByClassName('.container');

// Search for keyword and fetch from API
function searching(e) {
  e.preventDefault();
  imagesEl.innerHTML = "";

  const myQuery = search.value;
  if (myQuery.trim()) {
      try{
         fetch( `https://www.googleapis.com/customsearch/v1?key=AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk&cx=014821957775912081400:skraxelfrf0&q=${myQuery}`)
            .then((res) => res.json()) // catch promise
            .then((data) => {   // catching second promise
                console.log(data);
                resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
                resultTxtHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
                if(!data.items){
                    container.innerHTML = `
                        <h3>It seems there is nothink you are looking for...</h3>
                    `;
                }else{
                    resultsEl.innerHTML = data.items.map(item =>
                        `<h3><a href="${item.link}">${item.htmlTitle}</a></h3>
                        <p><a href="${item.link}">${item.link}</a></p>
                        <p>${item.htmlSnippet}</p>
                        `
                    ).join('');

                    // imagesEl.innerHTML = data.items.map(img => 
                    //     {if(img.image){
                    //        `<img src="${img.image}" />
                    //     ` 
                    //     }else
                    //     ``
                    //     }).join('');
                }
            }); 
        }catch(ex){
            console.log(ex);
        }
    
  } else {
    console.log("type smth");
  }
}

// Event listeners
submit.addEventListener("submit", searching);
