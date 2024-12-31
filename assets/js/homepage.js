const config = {
  API_KEY: 'c2ebe3d363b34d7cc6f174adb4d219aa',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w780',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/original',
  MY_LIST_KEY: 'myList',
  CAROUSEL_INTERVAL: 5000,
  CACHE_DURATION: 86400000, // 24 hours in milliseconds
  CACHE_KEY_PREFIX: 'tmdb_cache_'
};

const ENDPOINTS = {
  popularMovies: `${config.BASE_URL}/movie/popular`,
  popularTVShows: `${config.BASE_URL}/trending/tv/day`, 
  topRatedMovies: `${config.BASE_URL}/movie/top_rated`,
  topRatedTVShows: `${config.BASE_URL}/tv/top_rated`,
  movieDetails: (id) => `${config.BASE_URL}/movie/${id}`,
  tvDetails: (id) => `${config.BASE_URL}/tv/${id}`,
  search: `${config.BASE_URL}/search/multi`
};

// Cache management utilities
const cacheManager = {
  set(key, data) {
    const cacheEntry = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(config.CACHE_KEY_PREFIX + key, JSON.stringify(cacheEntry));
  },

  get(key) {
    const cached = localStorage.getItem(config.CACHE_KEY_PREFIX + key);
    if (!cached) return null;

    const cacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - cacheEntry.timestamp > config.CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(config.CACHE_KEY_PREFIX + key);
      return null;
    }

    return cacheEntry.data;
  },

  getCacheKey(url, isSearch = false, query = '') {
    return isSearch ? `search_${query}` : url.replace(/[^a-zA-Z0-9]/g, '_');
  }
};

const limitWords = (text, limit) => {
  const words = text.split(' ');
  return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
};

let carouselMovies = [];

// Curated content IDs
const movieIds = [1011985, 278, 238, 1034541, 698687];
const tvShowIds = [153312, 2288, 1396, 60625, 1398];

let currentSlideIndex = 0;
let carouselInterval;
let isUpdating = false;
let isSearchActive = false;

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const lazyLoadObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyLoadObserver.unobserve(img);
        }
      }
    });
  },
  {
    rootMargin: '50px 0px',
    threshold: 0.1
  }
);

async function restoreMainContent() {
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  mainContent.innerHTML = `
    <div class="hero">
      <div class="hero-content"></div>
    </div>
    <section id="popular-movies" class="section">
      <h2 class="section-title">Popular Movies</h2>
      <div class="row"></div>
    </section>
    <section id="popular-tv-shows" class="section">
      <h2 class="section-title">Trending TV Shows</h2>
      <div class="row"></div>
    </section>
    <section id="top-rated-movies" class="section">
      <h2 class="section-title">Top Rated Movies</h2>
      <div class="row"></div>
    </section>
    <section id="top-rated-tv-shows" class="section">
      <h2 class="section-title">Top Rated TV Shows</h2>
      <div class="row"></div>
    </section>
  `;

  await initializeHeroCarousel();

  await Promise.all([
    populateSection('popular-movies', ENDPOINTS.popularMovies),
    populateSection('popular-tv-shows', ENDPOINTS.popularTVShows), 
    populateSection('top-rated-movies', ENDPOINTS.topRatedMovies),
    populateSection('top-rated-tv-shows', ENDPOINTS.topRatedTVShows)
  ]);
}

function toggleMyList(item) {
  let myList = JSON.parse(localStorage.getItem(config.MY_LIST_KEY) || '[]');
  const itemId = `${item.media_type}-${item.id}`;

  const existingIndex = myList.findIndex(listItem => 
    `${listItem.media_type}-${listItem.id}` === itemId
  );

  if (existingIndex === -1) {
    myList.push({
      id: item.id,
      media_type: item.media_type,
      title: item.title || item.name,
      poster_path: item.poster_path,
      vote_average: item.vote_average
    });
  } else {
    myList.splice(existingIndex, 1);
  }

  localStorage.setItem(config.MY_LIST_KEY, JSON.stringify(myList));
  return existingIndex === -1;
}

async function performSearch(query) {
  query = query.trim();

  if (!query) {
    if (isSearchActive) {
      await restoreMainContent();
      isSearchActive = false;
    }
    return;
  }

  isSearchActive = true;
  const searchResults = await fetchFromTMDB(ENDPOINTS.search, true, query);

  const movieResults = searchResults.filter(item => item.media_type === 'movie')
    .sort((a, b) => b.popularity - a.popularity);
    
  const tvResults = searchResults.filter(item => item.media_type === 'tv')
    .sort((a, b) => b.popularity - a.popularity);

  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.className = 'search-results-container';

  const searchTitle = document.createElement('h2');
  searchTitle.className = 'section-title';
  searchTitle.textContent = `Search Results for "${query}"`;
  searchResultsContainer.appendChild(searchTitle);

  if (movieResults.length || tvResults.length) {
    if (movieResults.length) {
      const movieSection = createSearchSection('Movies', movieResults);
      searchResultsContainer.appendChild(movieSection);
    }

    if (tvResults.length) {
      const tvSection = createSearchSection('TV Shows', tvResults);
      searchResultsContainer.appendChild(tvSection);
    }
  } else {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <h3>No results found for "${query}"</h3>
      <p>Try adjusting your search terms or check the spelling.</p>
    `;
    searchResultsContainer.appendChild(noResults);
  }

  mainContent.appendChild(searchResultsContainer);
  applySearchStyles();
  preventImageDrag();
}

function createSearchSection(title, results) {
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <h3 class="section-title">${title}</h3>
    <div class="search-results grid-layout"></div>
  `;

  const grid = section.querySelector('.grid-layout');
  results.forEach(item => {
    const card = createCard(item);
    if (card) grid.appendChild(card);
  });

  return section;
}

function applySearchStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .search-results-container { padding: 20px; }
    .grid-layout {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    .grid-layout .movie-card {
      margin: 0;
      width: 100%;
    }
    .no-results {
      text-align: center;
      padding: 40px;
      color: #fff;
    }
    .no-results h3 { margin-bottom: 10px; }
    @media (max-width: 768px) {
      .grid-layout {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
      }
    }
  `;
  document.head.appendChild(style);
}

const debouncedUpdateCarousel = debounce(async () => {
  if (isUpdating || !carouselMovies?.length) return;
  isUpdating = true;

  const hero = document.querySelector('.hero');
  if (!hero) {
    isUpdating = false;
    return;
  }

  if (currentSlideIndex < 0 || currentSlideIndex >= carouselMovies.length) {
    isUpdating = false;
    return;
  }

  const currentMovie = carouselMovies[currentSlideIndex];
  if (!currentMovie) {
    isUpdating = false;
    return;
  }

  const overview = currentMovie.overview || '';
  const limitedOverview = overview ? limitWords(overview, 40) : '';

  const newContent = document.createElement('div');
  newContent.className = 'hero-content';
  newContent.innerHTML = `
    <h1>${currentMovie.title || currentMovie.name}</h1>
    <p>${limitedOverview}</p>
    <button class="cta-button" data-id="${currentMovie.id}" data-media-type="${currentMovie.media_type}">
      Play now
    </button>
  `;

  if (currentMovie.backdrop_path) {
    hero.style.backgroundImage = `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
      url('${config.BACKDROP_BASE_URL}${currentMovie.backdrop_path}')
    `;
  }

  const oldContent = hero.querySelector('.hero-content');
  if (oldContent) {
    oldContent.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 10));
    oldContent.remove();
  }

  newContent.classList.add('fade-in');
  hero.appendChild(newContent);
  addPlayButtonClickListener();

  isUpdating = false;
}, 50);

async function fetchFromTMDB(url, isSearch = false, query = '') {
  const cacheKey = cacheManager.getCacheKey(url, isSearch, query);
  const cachedData = cacheManager.get(cacheKey);

  if (cachedData) return cachedData;

  try {
    const params = new URLSearchParams({
      api_key: config.API_KEY,
      language: 'en-US',
      page: '1'
    });
    
    if (isSearch) params.append('query', query);
    
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    const results = data.results || data;

    cacheManager.set(cacheKey, results);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function createCarouselNavigation() {
  const hero = document.querySelector('.hero');
  hero.insertAdjacentHTML('beforeend', '<div class="carousel-indicators"></div>');
}

function navigateCarousel(direction) {
  if (direction === 'next') {
    currentSlideIndex = (currentSlideIndex + 1) % carouselMovies.length;
  }
  debouncedUpdateCarousel();
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => navigateCarousel('next'), config.CAROUSEL_INTERVAL);
}

async function initializeHeroCarousel() {
  const carouselCacheKey = 'carousel_data';
  carouselMovies = cacheManager.get(carouselCacheKey);

  if (!carouselMovies) {
    try {
      const [movieResults, tvShowResults] = await Promise.all([
        Promise.all(movieIds.map(id => fetchFromTMDB(ENDPOINTS.movieDetails(id)))),
        Promise.all(tvShowIds.map(id => fetchFromTMDB(ENDPOINTS.tvDetails(id))))
      ]);

      carouselMovies = [
        ...movieResults.map(m => ({...m, media_type: 'movie'})),
        ...tvShowResults.map(t => ({...t, media_type: 'tv'}))
      ];

      cacheManager.set(carouselCacheKey, carouselMovies);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      return;
    }
  }

  if (!carouselMovies.length) return;

  carouselMovies.sort(() => Math.random() - 0.5);

  createCarouselNavigation();
  debouncedUpdateCarousel();
  resetCarouselInterval();

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    hero.addEventListener('mouseleave', resetCarouselInterval);
  }
}

function isInMyList(item) {
  const myList = JSON.parse(localStorage.getItem(config.MY_LIST_KEY) || '[]');
  return myList.some(listItem => 
    listItem.id === item.id && listItem.media_type === item.media_type
  );
}

function updateMyListButton(button, isInList) {
  button.classList.toggle('in-list', isInList);
  button.textContent = isInList ? '✓' : '+';
  button.title = isInList ? 'Remove from My List' : 'Add to My List';
}

function estimateQuality(releaseDate) {
  if (!releaseDate) return 'HD';
  
  const timeDiff = Date.now() - new Date(releaseDate).getTime();
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  
  return timeDiff < oneMonth ? 'CAM' : 'HD';
}

function createCard(item) {
  if (!item.poster_path) return null;

  const posterPath = `${config.IMAGE_BASE_URL}${item.poster_path}`;
  const isInList = isInMyList(item);
  const title = item.media_type === 'tv' ? item.name : item.title;
  const quality = estimateQuality(item.release_date || item.first_air_date);

  const card = document.createElement('div');
  card.className = 'movie-card';
  card.dataset.id = item.id;
  card.dataset.mediaType = item.media_type;

  card.innerHTML = `
    <img 
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E"
      data-src="${posterPath}"
      alt="${title} Poster"
      class="lazy-image"
    >
    <div class="quality-badge">${quality}</div>
    <div class="rating">★ ${item.vote_average.toFixed(1)}</div>
    <div class="movie-name">${title}</div>
    <button class="my-list-btn ${isInList ? 'in-list' : ''}" 
            title="${isInList ? 'Remove from My List' : 'Add to My List'}">
      ${isInList ? '✓' : '+'}
    </button>
  `;

  lazyLoadObserver.observe(card.querySelector('img'));

  const myListBtn = card.querySelector('.my-list-btn');
  myListBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasAdded = toggleMyList(item);
    updateMyListButton(myListBtn, wasAdded);
  });

  card.addEventListener('click', () => {
    const params = new URLSearchParams({
      id: item.id,
      type: item.media_type,
      title
    });
    window.location.href = `watch.php?${params}`;
  });

  return card;
}

function addMouseDragScrolling(element) {
  let isDown = false;
  let startX;
  let scrollLeft;

  element.addEventListener('mousedown', (e) => {
    isDown = true;
    element.classList.add('active');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
    e.preventDefault();
  });

  element.addEventListener('mouseleave', () => {
    isDown = false;
    element.classList.remove('active');
  });

  element.addEventListener('mouseup', () => {
    isDown = false;
    element.classList.remove('active');
  });

  element.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    element.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

const preventImageDrag = () => {
  document.querySelectorAll('.movie-card img')
    .forEach(img => img.addEventListener('dragstart', e => e.preventDefault()));
};

async function populateSection(sectionId, endpoint) {
  const section = document.querySelector(`#${sectionId} .row`);
  if (!section) return;

  section.innerHTML = '';

  const items = await fetchFromTMDB(endpoint);
  items.forEach(item => {
    if (!item.media_type) {
      item.media_type = endpoint.includes('/movie/') ? 'movie' : 'tv';
    }
    const card = createCard(item);
    if (card) section.appendChild(card);
  });

  addMouseDragScrolling(section);
  preventImageDrag();
}

function addPlayButtonClickListener() {
  const playButton = document.querySelector('.hero .cta-button');
  if (playButton) {
    playButton.addEventListener('click', (e) => {
      const params = new URLSearchParams({
        id: e.target.dataset.id,
        type: e.target.dataset.mediaType,
        title: document.querySelector('.hero h1').textContent
      });
      window.location.href = `watch.php?${params}`;
    });
  }
}

function clearSiteCache() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(config.CACHE_KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });

  sessionStorage.clear();
  if ('caches' in window) {
    caches.keys().then(names => names.forEach(name => caches.delete(name)));
  }
}

function cleanupExpiredCache() {
  const now = Date.now();
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(config.CACHE_KEY_PREFIX)) {
      try {
        const cacheEntry = JSON.parse(localStorage.getItem(key));
        if (now - cacheEntry.timestamp > config.CACHE_DURATION) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  });
}

async function initializePage() {
  cleanupExpiredCache();
  await restoreMainContent();

  const searchInputs = {
    desktop: document.querySelector('.desktop-sidebar .search-input'),
    mobile: document.querySelector('.mobile-search-bar .search-input')
  };

  Object.values(searchInputs).forEach(input => {
    if (input) {
      input.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
          performSearch(e.target.value);
          if (input === searchInputs.mobile) {
            document.querySelector('.mobile-search-bar').classList.remove('active');
          }
        }
      });
    }
  });

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileSidebar = document.querySelector('.mobile-sidebar');

  if (mobileMenuBtn && mobileSidebar) {
    mobileMenuBtn.addEventListener('click', () => 
      mobileSidebar.classList.toggle('active')
    );

    document.addEventListener('click', e => {
      if (!mobileSidebar.contains(e.target) && 
          !e.target.classList.contains('mobile-menu-btn')) {
        mobileSidebar.classList.remove('active');
      }
    });
  }
}

const style = document.createElement('style');
style.textContent = `
  .lazy-image {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
  .lazy-image[src^="http"] {
    opacity: 1;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', initializePage);
