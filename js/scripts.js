// Immutable Constant Variables
const apiKey = "d18a9887"
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`

const query = document.getElementById('query');
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
    clearArticle();
    const article = buildArticle(obj);
    main.append(article);
}

function buildArticle(obj) {

    // Building the key elements to represent main details of film
    // main details include: Poster Image, Title, Year of Release, Genres, Runtime, Rated Level, Plot Description

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

    article.append(div);
    container.append(genres, runtime, rated);
    div.append(poster, titleYear, container, p);

    poster.src = obj.Poster;
    poster.alt = `Poster of the movie ${obj.Title} released in ${obj.Year}`;
    titleYear.textContent = `${obj.Title} (${obj.Year})`;
    genres.textContent = `Genres: ${obj.Genre}`;
    runtime.textContent = `Runtime: ${obj.Runtime}`;
    rated.textContent = `Rated: ${obj.Rated}`;
    p.textContent = obj.Plot;

    // Actors Section
    buildActorsSection(div, obj.Actors);

    // Ratings Section
    buildRatingsSection(div, obj.Ratings);

    return article;
}

function buildActorsSection(div, actorData) {
    const actorText = document.createElement('h2');
    const actorList = document.createElement('ul');
    
    actorText.classList.add("sectionHeading");
    actorText.textContent = "Actors";
    
    let actorArray = (actorData).split(', ');
    actorArray = actorArray.map(returnListItem);

    for (const a of actorArray) {
        actorList.append(a);
    }

    div.append(actorText, actorList);
}

function buildRatingsSection(div, ratingsData) {
    const ratingsText = document.createElement('h2');
    const ratingsList = document.createElement('ul');

    ratingsList.style.listStyle = "none";
    ratingsList.style.textAlign = "center";

    ratingsText.classList.add("sectionHeading");
    ratingsText.textContent = "Ratings";

    // console.log(ratingsData);
    // console.log(ratingsData.map(rating => `${rating.Source} - ${rating.Value}`).map(returnListItem));

    ratingsData = ratingsData.map(rating => `${rating.Source} - ${rating.Value}`).map(returnListItem);
    ratingsData.forEach(element => {
        ratingsList.append(element);
    });

    div.append(ratingsText, ratingsList);

    // for (const rating of ratingsData) {
    //     const item = `${rating.Source}` - `${rating.Value}`;
    //     divreturnListItem(item);
    // }

}

function returnListItem(value) {
    const li = document.createElement('li');
    li.textContent = value;
    return li;
}

function clearArticle() {
    if (main.firstChild) { // if <article> element exists inside of <main>
        main.firstChild.remove(); // remove this <article> element, so it can be replaced by a new <article> representing the new search query input.
    }
}

// Event Listeners
query.addEventListener('change', function() {
    //console.log(query.value);
    loadSearch(query.value);
})

