const watchmodeKey = 'KymHqOJePgRiC2m3lXBM49ohK4n9KTA5yZ6a6CJe';
const omdbKey = 'd3e7890';

document.getElementById("searchSubmit").addEventListener("click", async function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    await getSearchResults(value);
});

document.getElementById("searchInput").addEventListener("keyup", async function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    await getSearchSuggestions(value);
});

async function getSearchSuggestions(query) {
    if (query.length < 3) return;
    let json = await search(query);
    console.log(json);
}

async function getSearchResults(query) {
    let json = await search(query);
    console.log(json);
}

async function search(value) {
    const url = "https://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey + "&s=" + value;
    let response = await fetch(url);
    return response.json();
}

async function getStreamingServices() {

}
