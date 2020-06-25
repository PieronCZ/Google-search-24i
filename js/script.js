function searching(e) {
  e.preventDefault();

  myQuery = escapeRegex(search.value);

  if (!myQuery.trim()) {
  } else {
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=4&q=${myQuery}`;
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=9&searchType=image&q=${myQuery}`;
    renderLoader(loading);
    searchFor(myQuery, webUrl);
    searchFor(myQuery, imgUrl);
  }
}

// Fetch
/*
async function searchFor(myQuery, url) {
  try {
    let response = await fetch(url);
    await response.json().then((data) => {
      container.style.display = "grid";
      if (!data.items && !data.error) {
        container.innerHTML = notFoundTxt;
      } else if (data.error) {
        if (data.error.code === 429) {
          container.innerHTML = maxQueriesTxt;
        }
        // Decide what to search for
      } else if (url === webUrl) {
        resultWebHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        displayWebResults(data);
      } else if (url === imgUrl) {
        resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
        displayImageResults(data);
      }
    });
  } catch (reason) {
    (reason) => console.log(`Fetch failed because ${reason}`);
  }
}*/

function searchFor(myQuery, url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      container.style.display = "grid";
      if (!data.items && !data.error) {
        clearLoader();
        container.innerHTML = notFoundTxt;
      } else if (data.error) {
        if (data.error.code === 429) {
          clearLoader();
          container.innerHTML = maxQueriesTxt;
        }
        // Decide what to search for
      } else if (url === webUrl) {
        resultWebHeading.innerHTML = `<h2>Web result for: ${myQuery}</h2>`;
        displayWebResults(data);
        clearLoader();
      } else if (url === imgUrl) {
        resultImgHeading.innerHTML = `<h2>Image result for: ${myQuery}</h2>`;
        displayImageResults(data);
        clearLoader();
      }
    })
    .catch((reason) => console.log(`Fetch failed because ${reason}`));
}

// Event listeners
submit.addEventListener("submit", searching);
