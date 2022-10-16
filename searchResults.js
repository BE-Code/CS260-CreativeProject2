const moviePosterList = document.getElementsByClassName('poster');

document.addEventListener('click', selectMovie);

function selectMovie(event) {
    let moviePoster = event.target;
    if (!moviePoster.classList.contains('poster')) return;

    let imdbID = moviePoster.getAttribute('data-imdb');
    showMovieInfo(imdbID);
}

function showMovieInfo(imdbID) {
    const resultsDiv = document.getElementById('results');
    const movieInfoDiv = document.getElementById('movieInfo');

    resultsDiv.style.display = 'none';
    movieInfoDiv.style.display = 'flex';

    
}