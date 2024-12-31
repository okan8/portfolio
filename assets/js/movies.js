// Constants from your existing scripts.js
const TMDB_API_KEY = "c2ebe3d363b34d7cc6f174adb4d219aa";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const MY_LIST_KEY = "myList";

let currentPage = 1;
let currentGenre = "all";
let currentSort = "popular";
let isLoading = false;
let totalPages = 1;

let isSearchActive = false;

// Additional endpoints for movies
const MOVIE_ENDPOINTS = {
  popular: `${BASE_URL}/movie/popular`,
  topRated: `${BASE_URL}/movie/top_rated`,
  upcoming: `${BASE_URL}/movie/upcoming`,
  genres: `${BASE_URL}/genre/movie/list`,
  search: `${BASE_URL}/search/multi`,
};

function preventImageDrag() {
  document.querySelectorAll(".movie-card img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
}

async function performSearch(query) {
  query = query.trim();

  if (query === "") {
    if (isSearchActive) {
      await restoreMainContent();
      isSearchActive = false;
    }
    return;
  }

  isSearchActive = true;
  const searchResults = await fetchFromTMDB(
    MOVIE_ENDPOINTS.search,
    true,
    query
  );

  // Clear existing content
  const mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = "";

  // Create a new section for search results
  const searchResultsSection = document.createElement("div");
  searchResultsSection.className = "section";
  searchResultsSection.innerHTML = `
        <h2 class="section-title">Search Results for "${query}"</h2>
        <div class="search-results"></div>
    `;
  mainContent.appendChild(searchResultsSection);

  const searchResultsContainer =
    searchResultsSection.querySelector(".search-results");

  // Populate search results
  searchResults.forEach((movie) => {
    if (movie.media_type === "movie") {
      searchResultsContainer.appendChild(createMovieCard(movie));
    }
  });

  // Prevent image dragging in search results
  preventImageDrag();
}

// Fetch movies with filters
async function fetchMovies(page = 1) {
  try {
    let endpoint = MOVIE_ENDPOINTS[currentSort] || MOVIE_ENDPOINTS.popular;
    let url = `${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;

    if (currentGenre !== "all") {
      // Use the 'discover' endpoint when filtering by genre
      url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&with_genres=${currentGenre}`;
    }

    // Add sort parameter
    if (currentSort === "popular") {
      url += "&sort_by=popularity.desc";
    } else if (currentSort === "topRated") {
      url += "&sort_by=vote_average.desc";
    } else if (currentSort === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      url += `&sort_by=popularity.desc&primary_release_date.gte=${today}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    totalPages = data.total_pages;
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// Fetch genres and populate the genre filter
async function populateGenreFilter() {
  try {
    const response = await fetch(
      `${MOVIE_ENDPOINTS.genres}?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    const genreSelect = document.querySelector(
      '.filter-select[data-filter="genre"]'
    );

    data.genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

async function fetchFromTMDB(url, isSearch = false, query = "") {
  try {
    let fullUrl;
    if (isSearch) {
      fullUrl = `${url}?api_key=${TMDB_API_KEY}&language=en-US&page=1&query=${encodeURIComponent(
        query
      )}`;
    } else {
      fullUrl = `${url}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    }
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data.results ? data.results : data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function isInMyList(item) {
  const myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || "[]");
  return myList.some(
    (listItem) =>
      listItem.id === item.id && listItem.media_type === item.media_type
  );
}

function updateMyListButton(button, isInList) {
  button.classList.toggle("in-list", isInList);
  button.textContent = isInList ? "✓" : "+";
  button.title = isInList ? "Remove from My List" : "Add to My List";
}

function addToMyList(movieData) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  // Check if movie is already in the list
  if (!myList.some((item) => item.id === movieData.id)) {
    myList.push(movieData);
    localStorage.setItem("myList", JSON.stringify(myList));

    // Update button appearance
    const btn = document.querySelector(`[data-movie-id="${movieData.id}"]`);
    if (btn) {
      btn.classList.add("added");
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
    }
  }
}

function removeFromMyList(movieId) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  myList = myList.filter((item) => item.id !== movieId);
  localStorage.setItem("myList", JSON.stringify(myList));

  // Update button appearance
  const btn = document.querySelector(`[data-movie-id="${movieId}"]`);
  if (btn) {
    btn.classList.remove("added");
    btn.innerHTML = '<i class="fas fa-plus"></i> Add to List';
  }
}

function toggleMyList(item) {
  let myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || "[]");
  const itemInList = isInMyList(item);

  if (itemInList) {
    // Remove item from list
    myList = myList.filter(
      (listItem) =>
        !(listItem.id === item.id && listItem.media_type === item.media_type)
    );
  } else {
    // Add item to list
    myList.push({
      id: item.id,
      media_type: item.media_type,
      title: item.title || item.name,
      poster_path: item.poster_path,
      vote_average: item.vote_average,
    });
  }

  localStorage.setItem(MY_LIST_KEY, JSON.stringify(myList));
  return !itemInList; // Returns true if item was added, false if removed
}

// Create movie/TV show card
function createMovieCard(item) {
  const posterPath = item.poster_path
    ? `${IMAGE_BASE_URL}${item.poster_path}`
    : null;

  if (!posterPath) return null;

  const isInList = isInMyList(item);
  const card = document.createElement("div");
  card.className = "movie-card";
  card.dataset.id = item.id;
  card.dataset.mediaType = item.media_type || "movie"; // Default to 'movie' if not specified

  const title = item.media_type === "tv" ? item.name : item.title;

  card.innerHTML = `
        <img src="${posterPath}" alt="${title} Poster">
        <div class="quality-badge">HD</div>
        <div class="rating">★ ${item.vote_average.toFixed(1)}</div>
        <div class="movie-name">${title}</div>
        <button class="my-list-btn ${isInList ? "in-list" : ""}" 
                title="${isInList ? "Remove from My List" : "Add to My List"}">
            ${isInList ? "✓" : "+"}
        </button>
    `;

  // Add My List button click handler
  const myListBtn = card.querySelector(".my-list-btn");
  myListBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card click event
    const wasAdded = toggleMyList(item);
    updateMyListButton(myListBtn, wasAdded);
  });

  // Add click handler for watching content
  card.addEventListener("click", () => {
    const videoParams = new URLSearchParams({
      id: item.id,
      type: item.media_type || "movie", // Default to 'movie' if not specified
      title: title,
    });
    window.location.href = `watch.php?${videoParams.toString()}`;
  });

  return card;
}

// Display movies in the grid
async function displayMovies(page = 1, append = false) {
  if (isLoading) return;
  isLoading = true;

  const moviesGrid = document.querySelector(".movies-grid");
  const loadingIndicator = document.createElement("div");
  loadingIndicator.className = "loading-indicator";
  loadingIndicator.textContent = "Loading...";

  moviesGrid.innerHTML = "";
  moviesGrid.appendChild(loadingIndicator);

  try {
    const movies = await fetchMovies(page);
    loadingIndicator.remove();
    moviesGrid.innerHTML = "";

    movies.forEach((movie) => {
      moviesGrid.appendChild(createMovieCard(movie));
    });

    // Update pagination controls
    updatePaginationControls();

    // Prevent image dragging
    document.querySelectorAll(".movie-card img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });
  } catch (error) {
    console.error("Error displaying movies:", error);
    loadingIndicator.textContent = "Error loading movies. Please try again.";
  } finally {
    isLoading = false;
  }
}

function updatePaginationControls() {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const currentPageSpan = document.getElementById("current-page");
  const totalPagesSpan = document.getElementById("total-pages");

  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;

  currentPageSpan.textContent = currentPage;
  totalPagesSpan.textContent = totalPages;
}

function handlePaginationClick(direction) {
  if (direction === "prev" && currentPage > 1) {
    currentPage--;
    displayMovies(currentPage);
  } else if (direction === "next" && currentPage < totalPages) {
    currentPage++;
    displayMovies(currentPage);
  }
}

// Initialize the movies page
async function initializeMoviesPage() {
  // Populate genre filter
  await populateGenreFilter();

  // Initial movie load
  await displayMovies();

  // Add filter event listeners
  const genreSelect = document.querySelector(
    '.filter-select[data-filter="genre"]'
  );
  const sortSelect = document.querySelector(
    '.filter-select[data-filter="sort"]'
  );
  const desktopSearchInput = document.querySelector(
    ".desktop-sidebar .search-input"
  );
  const mobileSearchInput = document.querySelector(
    ".mobile-search-bar .search-input"
  );

  desktopSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      performSearch(e.target.value);
    }
  });

  mobileSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      performSearch(e.target.value);
      // Close the mobile search bar after search
      document.querySelector(".mobile-search-bar").classList.remove("active");
    }
  });

  genreSelect.addEventListener("change", async (e) => {
    currentGenre = e.target.value;
    currentPage = 1;
    await displayMovies();
  });

  sortSelect.addEventListener("change", async (e) => {
    currentSort = e.target.value;
    currentPage = 1;
    await displayMovies();
  });

  // Add pagination event listeners
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  prevButton.addEventListener("click", () => handlePaginationClick("prev"));
  nextButton.addEventListener("click", () => handlePaginationClick("next"));
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeMoviesPage);
