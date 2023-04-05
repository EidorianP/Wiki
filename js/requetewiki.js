const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const searchTerm = searchInput.value;
  const apiUrl = `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exchars=200&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrlimit=1&origin=*`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      const pageTitle = page.title;
      const pageUrl = `https://fr.wikipedia.org/wiki/special:pageauhasard`;
      const pageExtract = page.extract;

      const resultHtml = `
        <div class="result">
          <h2><a href="${pageUrl}" target="_blank">${pageTitle}</a></h2>
          <p>${pageExtract}</p>
        </div>
      `;

      resultsContainer.innerHTML = resultHtml;
    })
    .catch(error => {
      console.error(error);
    });
});