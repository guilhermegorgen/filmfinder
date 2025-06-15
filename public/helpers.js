// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres');

    for (const genre of genres){
        let option = document.createElement('option');
        option.name = genre.name;
        option.value = genre.id;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElemetById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = documet.getElementById("likeOrDislikeBtns");
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById("moviePoster");
    const movieTextDiv = document.getElementById("movieText");
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImage = document.createElement('img');
    posterImage.setAttribute('src', moviePosterUrl);
    posterImage.setAttribute('id', 'moviePoster');

    return posterImage;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;

    return titleHeader;
};

// Create HTML for movie overview

const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overview.innerHTML = overview;

    return overview;
};


// Create HTML for movie cast
const createMovieCast = (cast) => {
    const castInfo = document.createElement('ul');
    castInfo.setAttribute('id', 'movieCast');
    cast.forEach(caster => {
        const casterInfo = document.createElement('li');
        casterInfo.setAttribute('id', `${caster.name}`);
        casterInfo.innerHTML = `${caster.name}`;
        castInfo.appendChild(casterInfo)
    });

    return castInfo;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo, movieCredits) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieCastDiv = document.getElementById('movieCast');
    const likeBtn = document.getElementById("likeButton");
    const dislikeBtn = document.getElementById("dislikeButton");

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overviews);
    const movieCast = createMovieCast(movieCredits.cast);

    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieCastDiv.appendChild(movieCast);

    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};

