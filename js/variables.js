// Variables
var myQuery,
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
const maxQueriesTxt = `<h3>Exceeded the maximum number of queries per day :(</h3>`;
const notFoundTxt = `<h3>We did not find any results for: ${myQuery}</h3>`;

// Constants
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  resultImgHeading = document.getElementById("result-img-heading"),
  resultWebHeading = document.getElementById("result-txt-heading"),
  imagesEl = document.getElementById("images"),
  resultsEl = document.getElementById("results"),
  popup = document.getElementById("popup-container"),
  paginationWeb = document.getElementById("paginationWeb"),
  paginationImg = document.getElementById("paginationImg"),
  container = document.getElementById("container");
