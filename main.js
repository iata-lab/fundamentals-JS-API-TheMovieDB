const TOKEN_API = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzAzZjU1MGVhZDk4ZDdjOTRhNjdhMDI0ZDYyMmY5OSIsIm5iZiI6MTc0NDgyNTE1My40MTEsInN1YiI6IjY3ZmZlYjQxNDM3ZjBiODBlZWFkODA5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P-u51CiiknNIUDN2qLl25VpOksjpoWuXhctQ6lGmXBY";
const API_URL = "https://api.themoviedb.org/3/search/movie?query=";
const URL_GENRE = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w400";
const DEFAULT_IMAGE = "https://via.placeholder.com/400x600.png?text=No+Image+Available";

const formularioData = document.querySelector("#formularioData");
const listMoviesContainer = document.querySelector("#listMovies");
let genreList = [];

async function getMovie(movie) {
    if (!movie.trim()) {
        showError("Please enter a movie title");
        return;
    }

    showLoading();

    try {
        const response = await axios.get(API_URL + encodeURIComponent(movie), {
            headers: {
                Authorization: `Bearer ${TOKEN_API}`,
                Accept: "application/json",
            },
        });

        if (response.data.results.length === 0) {
            showError(`No movies found for "${movie}"`)
            return;
        }

        renderCards(response.data.results);
    } catch (error) {
        showError("Error fetching movies. Please try again later.");
        console.error("Error:", error);
    }
}

function renderCards(movies) {
    listMoviesContainer.innerHTML = "";
    
    movies.forEach((movie) => {
        const genres = genreList
            .filter((gen) => movie.genre_ids.includes(gen.id))
            .map((gen) => `<span class="genre-tag">${gen.name}</span>`)
            .join("");

        const posterUrl = movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : DEFAULT_IMAGE;

        const newCard = document.createElement("div");
        newCard.innerHTML = `
            <div class="card mb-3" style="max-width: 440px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${posterUrl}" 
                             class="img-fluid rounded-start" 
                             alt="Poster of ${movie.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title mb-2"><strong>${movie.title}</strong></h4>
                            <p class="card-text mb-3">${movie.overview || 'No description available.'}</p>
                            <div class="genre-tags">${genres || '<span class="genre-tag">Uncategorized</span>'}</div>
                            ${movie.vote_average ? `<p class="card-text mt-2"><small class="text-muted">Rating: ${movie.vote_average.toFixed(1)}/10</small></p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        listMoviesContainer.appendChild(newCard);
    });
}

async function getGenre() {
    try {
        const res = await axios.get(URL_GENRE, {
            headers: {
                Authorization: `Bearer ${TOKEN_API}`,
                Accept: "application/json",
            },
        });
        genreList = res.data.genres;
    } catch (error) {
        showError("Error loading movie genres. Some features might be limited.");
        console.error("Error loading genres:", error);
    }
}

function showLoading() {
    listMoviesContainer.innerHTML = '<div class="loading">Searching for movies...</div>';
}

function showError(message) {
    listMoviesContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

formularioData.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = formularioData.querySelector("#searchInput");
    getMovie(searchInput.value);
    searchInput.value = "";
});

document.addEventListener("DOMContentLoaded", getGenre);