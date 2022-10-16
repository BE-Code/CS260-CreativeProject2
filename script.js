const watchmodeKey = 'KymHqOJePgRiC2m3lXBM49ohK4n9KTA5yZ6a6CJe';
const omdbKey = 'd3e7890';

document.getElementById("searchSubmit").addEventListener("click", async function(event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    if (value === "") return;
    await getSearchResults(value);
});

async function getSearchSuggestions(query) {
    let titles = [];

    if (query.length < 3) return titles;
    let json = await search(query);
    if (json.Search == null) return titles;
    console.log(json);

    let results = json.Search;
    for (let i = 0; i < results.length; i++) {
        let result = {};
        result.resultText = results[i].Title + ' (' + results[i].Year + ')';
        result.imdbID = results[i].imdbID;
        titles.push(result);
    }

    return titles;
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

async function getStreamingServices(IMDBid) {
    const url = 'https://api.watchmode.com/v1/title/' + IMDBid + '/sources/?apiKey=' + watchmodeKey;
    let response = await fetch(url);
    return response.json();
}

function autocomplete(inp) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", async function(e) {
        let searchData = await getSearchSuggestions(this.value);
        let imdbIDs = searchData.map(e => e.imdbID);
        let arr = searchData.map(e => e.resultText);

        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            b.innerHTML = arr[i];
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "' data-imdb='" + imdbIDs[i] + "'>";
            
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                let clickedElem = this.getElementsByTagName("input")[0];
                inp.value = clickedElem.value;
                
                showMovie(clickedElem.getAttribute('data-imdb'));
                
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        }
        else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        }
        else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("searchInput"));


/*************************** Search Results ***************************************/
const moviePosterList = document.getElementsByClassName('poster');

document.addEventListener('click', selectMovie);

function selectMovie(event) {
    let moviePoster = event.target;
    if (!moviePoster.classList.contains('poster')) return;

    const searchBar = document.getElementsByTagName('form')[0];
    searchBar.style.display = 'none';

    let imdbID = moviePoster.getAttribute('data-imdb');
    showMovieInfo(imdbID);
}

function showMovieInfo(imdbID) {
    const resultsDiv = document.getElementById('results');
    const movieInfoDiv = document.getElementById('movieInfo');
    const searchResultsHeading = document.querySelector("#searchDiv > h2");

    resultsDiv.style.display = 'none';
    searchResultsHeading.style.display = 'none';
    movieInfoDiv.style.display = 'flex';
}
/*************************** End Search Results ***************************************/