// Immutable Constant Variables
const apiKey = "d18a9887"
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`

const main = document.querySelector('main');

// Mutable Let Variables


// Functions
function testDoSomething() {
    console.log("Hello");
}

async function loadSearch(searchQueryValue) {
    const jsonResult = await getFilm(searchQueryValue);
    loadPage(jsonResult);
}

async function getFilm(value) {
    const response = await fetch(`${baseURL}t=${value}`);
    return response.json();
} 

function loadPage(obj) {
    const article = buildArticle(obj);
    main.append(article);
}

function buildArticle(obj) {

    const article = document.createElement('article');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    article.append(div);
    div.append(img, h2, h3, p);

    img.src = obj.Poster;
    img.alt = `Poster of the movie ${obj.Title} released in ${obj.Year}`;
    h2.textContent = `${obj.Title} (${obj.Year})`;
    h3.textContent = `Genres: ${obj.Genre}`;
    p.textContent = obj.Plot;

    return article;
}


// Event Listeners
query.addEventListener('change', function() {
    //console.log(query.value);
    loadSearch(query.value);
})

