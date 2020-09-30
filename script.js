const searchField = document.querySelector('.search-field'),
      caseCheckbox = document.querySelector('#case-checkbox'),
      lengthButton = document.querySelector('.length-button'),
      substringButton = document.querySelector('.substring-button'),
      resultArea = document.querySelector('.search-results');

lengthButton.addEventListener('click', getSearchResults.bind(null, lengthFilter));
substringButton.addEventListener('click', getSearchResults.bind(null, substringFilter));

function getSearchResults(callback, e) {
  e.preventDefault();

  getResource()
    .then(res => callback(res, searchField.value))
    .then(res => renderResult(res));
}

function lengthFilter({ data }, length) {
  if(typeof(+length) !== 'number' || length === '') {
    return [];
  }

  return data.filter(e => e.length > length);
}

function substringFilter({ data }, substring) {
  if(!substring) {
    return [];
  }

  if (caseCheckbox.checked) {
    return data.filter(e => e.indexOf(substring) + 1);
  } 

  return data.filter(e => e.toLowerCase()
                           .indexOf(substring.toLowerCase()) + 1)
}

function renderResult(data) {
  resultArea.innerHTML = '';

  data.forEach(e => {
    resultArea.insertAdjacentHTML('beforeend', `<div class="result-item">${e}</div>`);
  });
}

async function getResource() {
  const res = await fetch('https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json');

  if(!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
  }

  return await res.json();
}