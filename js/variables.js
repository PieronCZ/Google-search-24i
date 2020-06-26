// Default export
export default "Variables Export";

export let startIndex;
export function modifyStartIndex(value){startIndex = value;}

// Key and CX
export const key = 'AIzaSyA1EmO9ayEkJ3V7Fd5D5nbI2BLby45eeMk', cx = '014821957775912081400';

// Urls
export let webUrl, imgUrl;

// Function to modify urls
export function modifyUrl(url, index, query){
  if(url === 'webUrl'){
    webUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=4&start=${index}&q=${query}`;
  }else if(url === 'imgUrl'){
    imgUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}:skraxelfrf0&num=9&searchType=image&start=${index}&q=${query}`;
  }
}

