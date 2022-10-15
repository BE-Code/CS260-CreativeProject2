const watchmodeKey = 'KymHqOJePgRiC2m3lXBM49ohK4n9KTA5yZ6a6CJe';
const omdbKey = 'd3e7890';


document.getElementById("searchSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    search(value);
});

function search(value) {
    // const url = 'https://api.watchmode.com/v1/search/?apiKey=' + watchmodeKey + '&search_field=name&types=movie&search_value=' + value;
    const url = "https://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey + "&s=" + value;

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
