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
    article.classList.add("film");
    const div = document.createElement('div');
    const poster = document.createElement('img');
    const titleYear = document.createElement('h2');
    const container = document.createElement('div');
    container.classList.add("no-border");
    const rated = document.createElement('h3');
    const genres = document.createElement('h3');
    const runtime = document.createElement('h3');
    const p = document.createElement('p');
    const actorText = document.createElement('h2');
    actorText.classList.add("actorText");
    const actorList = document.createElement('ul');

    let actorArray = (obj.Actors).split(', ');
    actorArray = actorArray.map(returnListItem);

    article.append(div);
    container.append(genres, runtime, rated);

    for (const a of actorArray) {
        actorList.append(a);
    }

    div.append(poster, titleYear, container, p, actorText, actorList);

    poster.src = obj.Poster;
    poster.alt = `Poster of the movie ${obj.Title} released in ${obj.Year}`;
    titleYear.textContent = `${obj.Title} (${obj.Year})`;
    genres.textContent = `Genres: ${obj.Genre}`;
    runtime.textContent = `Runtime: ${obj.Runtime}`;
    rated.textContent = `Rated: ${obj.Rated}`;
    p.textContent = obj.Plot;
    actorText.textContent = "Actors";


    return article;
}

function returnListItem(value) {
    const li = document.createElement('li');
    li.textContent = value;
    return li;
}

// Event Listeners
query.addEventListener('change', function() {
    //console.log(query.value);
    loadSearch(query.value);
})

