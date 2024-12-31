const TMDB_API_KEY = 'c2ebe3d363b34d7cc6f174adb4d219aa';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const MY_LIST_KEY = 'myList';
const CONTINUE_WATCHING_KEY = 'continueWatching';

function isInMyList(item) {
    const myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || '[]');
    return myList.some(listItem => 
        listItem.id === item.id && listItem.media_type === item.media_type
    );
}

function toggleMyList(item) {
    let myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || '[]');
    const itemInList = isInMyList(item);
    
    if (itemInList) {
        myList = myList.filter(listItem => 
            !(listItem.id === item.id && listItem.media_type === item.media_type)
        );
    } else {
        myList.push({
            id: item.id,
            media_type: item.media_type,
            title: item.title || item.name,
            poster_path: item.poster_path,
            vote_average: item.vote_average
        });
    }
    
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(myList));
    return !itemInList;
}

function updateMyListButton(button, isInList) {
    button.classList.toggle('in-list', isInList);
    button.textContent = isInList ? '✓' : '+';
    button.title = isInList ? 'Remove from My List' : 'Add to My List';
}

function getContinueWatchingList() {
  return JSON.parse(localStorage.getItem(CONTINUE_WATCHING_KEY) || '[]');
}

function displayContinueWatching() {
  const continueWatchingList = getContinueWatchingList();
  const container = document.getElementById('continue-watching-container');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (continueWatchingList.length === 0) {
      container.style.display = 'none';
      document.getElementById('continueWatching').style.display = 'none';
      return;
  }

  document.getElementById('continueWatching').style.display = 'block';
  container.style.display = 'grid';
  
  continueWatchingList.forEach(item => {
      const card = createContinueWatchingCard(item);
      if (card) {
          container.appendChild(card);
      }
  });

  addMouseDragScrolling(container);
  preventImageDrag();
}

function createContinueWatchingCard(item) {
  const posterPath = item.poster_path 
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : null;

  if (!posterPath) return null;

  const card = document.createElement('div');
  card.className = 'movie-card';
  card.dataset.id = item.id;
  card.dataset.mediaType = item.media_type;

  const title = item.title || item.name;
  const progress = item.progress || 0;

  card.innerHTML = `
      <img src="${posterPath}" alt="${title} Poster">
      <div class="quality-badge">HD</div>
      <div class="rating">★ ${item.vote_average.toFixed(1)}</div>
      <div class="movie-name">${title}</div>
      <div class="progress-bar">
          <div class="progress" style="width: ${progress}%"></div>
      </div>
  `;

  card.addEventListener('click', () => {
      const videoParams = new URLSearchParams({
          id: item.id,
          type: item.media_type,
          title: title
      });
      window.location.href = `watch.php?${videoParams.toString()}`;
  });

  return card;
}

function createCard(item) {
    const posterPath = item.poster_path 
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : null;

    if (!posterPath) return null;

    const isInList = isInMyList(item);
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = item.id;
    card.dataset.mediaType = item.media_type;

    const title = item.title || item.name;

    card.innerHTML = `
        <img src="${posterPath}" alt="${title} Poster">
        <div class="quality-badge">HD</div>
        <div class="rating">★ ${item.vote_average.toFixed(1)}</div>
        <div class="movie-name">${title}</div>
        <button class="my-list-btn ${isInList ? 'in-list' : ''}" 
                title="${isInList ? 'Remove from My List' : 'Add to My List'}">
            ${isInList ? '✓' : '+'}
        </button>
    `;

    const myListBtn = card.querySelector('.my-list-btn');
    myListBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasAdded = toggleMyList(item);
        updateMyListButton(myListBtn, wasAdded);
        
        // If item was removed, remove the card and check if list is empty
        if (!wasAdded) {
            card.remove();
            checkEmptyList();
        }
    });

    card.addEventListener('click', () => {
        const videoParams = new URLSearchParams({
            id: item.id,
            type: item.media_type,
            title: title
        });
        window.location.href = `watch.php?${videoParams.toString()}`;
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
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
    });
}

function preventImageDrag() {
    document.querySelectorAll('.movie-card img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

function checkEmptyList() {
    const myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || '[]');
    const emptyListElement = document.getElementById('empty-list');
    const mylistContainer = document.getElementById('mylist-container');
    
    if (myList.length === 0) {
        emptyListElement.style.display = 'flex';
        mylistContainer.style.display = 'none';
    } else {
        emptyListElement.style.display = 'none';
        mylistContainer.style.display = 'grid';
    }
}

function displayMyList() {
    const myList = JSON.parse(localStorage.getItem(MY_LIST_KEY) || '[]');
    const container = document.getElementById('mylist-container');
    
    container.innerHTML = '';
    
    myList.forEach(item => {
        const card = createCard(item);
        if (card) {
            container.appendChild(card);
        }
    });

    checkEmptyList();
    addMouseDragScrolling(container);
    preventImageDrag();
}

// Initialize the page
function initializePage() {
  displayMyList();
  displayContinueWatching();

  // Mobile menu functionality (existing code)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileSidebar = document.querySelector('.mobile-sidebar');
  
  if (mobileMenuBtn && mobileSidebar) {
      mobileMenuBtn.addEventListener('click', () => {
          mobileSidebar.classList.toggle('active');
      });
  }

  // Close mobile sidebar when clicking outside (existing code)
  document.addEventListener('click', (e) => {
      if (mobileSidebar && 
          !mobileSidebar.contains(e.target) && 
          !e.target.classList.contains('mobile-menu-btn')) {
          mobileSidebar.classList.remove('active');
      }
  });
}

document.addEventListener('DOMContentLoaded', initializePage);