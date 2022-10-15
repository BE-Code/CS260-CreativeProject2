const watchmodeKey = 'KymHqOJePgRiC2m3lXBM49ohK4n9KTA5yZ6a6CJe';
const omdbKey = 'd3e7890';


document.getElementById("searchSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    search(value);
});

document.getElementById("searchInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    search(value);
});

function search(value) {
    const url = "https://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey + "&s=" + value;

    if (value < 3) return;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
        });
}

function getStreamingServices() {

}
