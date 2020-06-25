let myQuery,
  item,
  link,
  htmlTitle,
  htmlSnippet,
  image,
  contextLink,
  webUrl,
  imgUrl,
  pagination;

  // Messages
 const maxQueriesTxt = `<h3>Exceeded the maximum number of queries per day :(</h3>`,
              notFoundTxt = `<h3>We did not find any results for: ${myQuery}</h3>`;

  // Constants
 const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  resultImgHeading = document.getElementById("result-img-heading"),
  resultWebHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  paginationWeb = document.getElementById("paginationWeb"),
  paginationImg = document.getElementById("paginationImg"),
  container = document.getElementById("container"),
  loading = document.getElementById('loading'),
  loadingImg = document.getElementById('loading-img'),
  loadingWeb = document.getElementById('loading-web');


  // Key and CX
 const key = 'AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk',
        cx = '014821957775912081400';


