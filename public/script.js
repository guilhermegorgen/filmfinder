const tmdbKey = '87cd622bba1b264c87e031bacefce08c';
const tmdbBaseUrl = 'https://api.themoviedb.org';
const playBtn = document.getElementById("playButton");

async function getGenres(){
    const genreRequestEndpoint = '/3/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch(error){
        console.log(error)
    }
};


const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/3/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch(error){
        console.log(error)
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/3/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const movieInfo = await response.json();
            return movieInfo; 
        }
    } catch(error){
        console.log(error);
    }
};


const getMovieCredits = async (movie) => {
    const movieId = movie.id;
    const creditsEndpoint = `/3/movie/${movieId}/credits/`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + creditsEndpoint + requestParams;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const movieCredits = await response.json();
            return movieCredits;
        }
    } catch(error){
        console.log(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    clearCurrentMovie();
    if(movieInfo.childNodes.length > 0){
        const movies = await getMovies();
        const randomMovie = await getRandomMovie(movies);
        const info = await getMovieInfo(randomMovie);
        const credits = await getMovieCredits(randomMovie);
        displayMovie(info, credits);
    };
};


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
