// Immutable Constant Variables
const apiKey = "d18a9887"
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`

// Mutable Let Variables


// Functions
function testDoSomething() {
    console.log("Hello");
}

async function loadSearch(searchQueryValue) {
    const jsonResult = await getFilm(searchQueryValue);
}

async function getFilm(value) {
    const response = await fetch(`${baseURL}t=${value}`);
    return response.json();
} 

function buildArticle(obj) {
    
}


// Event Listeners
query.addEventListener('change', function() {
    //console.log(query.value);
    loadSearch(query.value);
})



