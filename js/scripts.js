// Immutable Constant Variables
const apiKey = "d18a9887"
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`

// Mutable Let Variables


// Functions
function doSomething() {
    console.log("Hello");
}

async function getFilm(searchQueryValue) {
    const response = await fetch(`${baseURL}t=${searchQueryValue}`);
    return response.json();
} 


// Event Listeners
query.addEventListener('change', function() {
    //console.log(query.value);
    getFilm(query.value);
})



