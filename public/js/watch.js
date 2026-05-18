/* =========================================
   VIDEO PLAYER
========================================= */
const player = videojs(
  'movie-player',
  {
    controls: true,
    autoplay: false,
    preload: 'auto',
  }
);

/* =========================================
   MOVIE DATA
========================================= */
const movies = [
  {
    id: 1,
    title: "Avatar: Fire and Ash",
    rating: "8.5",
    image: "img/avatar.webp",
    banner: "img/avatar.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Petualangan epik terbaru Pandora dengan visual sinematik luar biasa.",
    genre: "Fantasy",
    year: "2025",
    quality: "4K Ultra HD",
    category: "Fantasy",
    video: "video/avatar.mp4"
  },
  {
    id: 2,
    title: "Star Wars: The Phantom Menace",
    rating: "9.0",
    image: "img/film6.webp",
    banner: "img/film6.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Perjalanan awal Anakin Skywalker dalam dunia galaksi Star Wars.",
    genre: "Sci-Fi",
    year: "1999",
    quality: "Full HD",
    category: "Sci-Fi",
    video: "video/starwars.mp4"
  },
  {
    id: 3,
    title: "Solo: A Star Wars Story",
    rating: "7.8",
    image: "img/film3.webp",
    banner: "img/film3.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Asal mula Han Solo menjadi penyelundup legendaris galaksi.",
    genre: "Adventure",
    year: "2018",
    quality: "Full HD",
    category: "Adventure",
    video: "video/solo.mp4"
  },
  {
    id: 4,
    title: "Predator: Padang Pasir",
    rating: "8.2",
    image: "img/film4.webp",
    banner: "img/film4.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Makhluk pemburu mematikan kembali meneror gurun mematikan.",
    genre: "Action",
    year: "2025",
    quality: "4K Ultra HD",
    category: "Action",
    video: "video/predator.mp4"
  },
  {
    id: 5,
    title: "Mercy",
    rating: "8.2",
    image: "img/film5.webp",
    banner: "img/film5.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Thriller futuristik penuh aksi dan misteri teknologi modern.",
    genre: "Thriller",
    year: "2024",
    quality: "HD",
    category: "Thriller",
    video: "video/mercy.mp4"
  },
  {
    id: 6,
    title: "A Wrinkle in Time",
    rating: "8.1",
    image: "img/film2.webp",
    banner: "img/film2.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Perjalanan lintas dimensi penuh fantasi dan petualangan keluarga.",
    genre: "Fantasy",
    year: "2018",
    quality: "Full HD",
    category: "Fantasy",
    video: "video/wrinkle.mp4"
  },
  {
    id: 7,
    title: "Under Wraps 2",
    rating: "8.0",
    image: "img/film7.webp",
    banner: "img/film7.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Komedi keluarga dengan petualangan mumi yang seru dan lucu.",
    genre: "Comedy",
    year: "2022",
    quality: "HD",
    category: "Comedy",
    video: "video/wraps.mp4"
  },
  {
    id: 8,
    title: "Genius",
    rating: "7.9",
    image: "img/film4.webp",
    banner: "img/film4.webp",
    shortDesc: "Watch cinematic streaming with ultra quality on CINEMAX.",
    fullDesc: "Film keluarga klasik penuh inspirasi dan humor ringan.",
    genre: "Comedy",
    year: "2023",
    quality: "HD",
    category: "Comedy",
    video: "video/genius.mp4"
  }
];

/* =========================================
   ELEMENTS
========================================= */
const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search-movie');
const heroBanner = document.getElementById('hero-banner');
const heroTitle = document.getElementById('hero-title');
const heroDescription = document.getElementById('hero-description');
const heroGenre = document.getElementById('hero-genre');
const heroYear = document.getElementById('hero-year');
const heroQuality = document.getElementById('hero-quality');
const floatingImage = document.getElementById('hero-floating-image');
const floatingTitle = document.getElementById('hero-floating-title');
const shortDescription = document.getElementById('movie-short-description');
const fullDescription = document.getElementById('hero-floating-description');
const detailCard = document.getElementById('movie-detail-card');
const viewAllBtn = document.getElementById('view-all-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const searchMovie = document.getElementById("search-movie");

/* =========================================
   STATE
========================================= */
let currentCategory = 'All';
let showAllMovies = false;
let currentMovie = movies[0];
let isPremium = false;

/* =========================================
   LOAD MOVIE
========================================= */
function loadMovie(movie) {
  currentMovie = movie;

  /* HERO */
  heroBanner.src = movie.banner;
  heroTitle.textContent = movie.title;
  heroDescription.textContent = movie.fullDesc;
  heroGenre.textContent = movie.genre;
  heroYear.textContent = movie.year;
  heroQuality.textContent = movie.quality;

  /* DETAIL CARD */
  floatingImage.src = movie.image;
  floatingTitle.textContent = movie.title;
  shortDescription.textContent = movie.shortDesc;
  fullDescription.textContent = movie.fullDesc;

  /* VIDEO */
  player.pause();
  player.src({
    src: movie.video,
    type: 'video/mp4'
  });
  player.poster(movie.banner);

  /* RESET VIDEO */
  player.currentTime(0);

  /* RESET DETAIL CARD */
  detailCard.classList.remove('active');

  /* ACTIVE CARD */
  document.querySelectorAll('.movie-card').forEach((card) => {
    card.classList.remove('active-movie');
    if (Number(card.dataset.id) === movie.id) {
      card.classList.add('active-movie');
    }
  });

  /* HERO EFFECT */
  heroBanner.style.opacity = '0.5';
  setTimeout(() => {
    heroBanner.style.opacity = '1';
  }, 250);

  showToast(movie.title + ' Loaded');
}

/* =========================================
   RENDER MOVIES
========================================= */
function renderMovies(movieList) {
  movieContainer.innerHTML = '';

  movieList.forEach((movie) => {
    movieContainer.innerHTML += `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-image">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-overlay">
                    <button class="watch-btn">Watch Now</button>
                </div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
            </div>
        </div>
    `;
  });

  activateMovieCards();
}

/* =========================================
   CARD CLICK
========================================= */
function activateMovieCards() {
  const movieCards = document.querySelectorAll('.movie-card');

  movieCards.forEach((card) => {
    card.addEventListener('click', () => {
      const movieId = Number(card.dataset.id);
      const selectedMovie = movies.find((movie) => movie.id === movieId);

      if (selectedMovie) {
        loadMovie(selectedMovie);

        /* SAVE */
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));

        /* SCROLL TOP */
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* =========================================
   SEARCH
========================================= */
if (searchInput) {
  searchInput.addEventListener('input', filterMovies);
}

// Fixed missing variable/logic assignment error avoidance: keeping signature intact
function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = movies.filter((movie) => {
    const sameCategory = currentCategory === 'All' || movie.category === currentCategory;
    const sameKeyword = movie.title.toLowerCase().includes(keyword);
    return (sameCategory && sameKeyword);
  });
  renderMovies(filtered);
}

/* =========================================
   FILTER BUTTON
========================================= */
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((item) => {
      item.classList.remove('active');
    });
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterMovies();
  });
});

/* =========================================
   VIEW ALL
========================================= */
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    showAllMovies = !showAllMovies;

    if (showAllMovies) {
      renderMovies(movies);
      viewAllBtn.innerHTML = `
          <span class="material-symbols-outlined">visibility_off</span>
          Show Less
      `;
    } else {
      renderMovies(movies.slice(0, 4));
      viewAllBtn.innerHTML = `
          <span class="material-symbols-outlined">grid_view</span>
          View All
      `;
    }
  });
}

/* =========================================
   PLAY BUTTON
========================================= */
document.getElementById('action-play-btn')?.addEventListener('click', () => {
  player.play();
  showToast('Movie Started');
});

/* =========================================
   TRAILER BUTTON
========================================= */
document.getElementById('trailer-btn')?.addEventListener('click', () => {
  player.play();
  showToast('Trailer Started');
});

/* =========================================
   SMALL TRAILER BUTTON
========================================= */
document.getElementById('detail-trailer-btn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  player.play();
  showToast('Trailer Started');
});

/* =========================================
   FAVORITE
========================================= */
favoriteBtn?.addEventListener('click', () => {
  favoriteBtn.classList.toggle('active-favorite');

  if (favoriteBtn.classList.contains('active-favorite')) {
    showToast('Added To Favorite');
  } else {
    showToast('Removed From Favorite');
  }
});

/* =========================================
   SHARE
========================================= */
document.getElementById('share-btn')?.addEventListener('click', async () => {
  if (navigator.share) {
    await navigator.share({
      title: currentMovie.title,
      text: 'Watch ' + currentMovie.title,
      url: window.location.href
    });
  } else {
    showToast('Share Not Supported');
  }
});

/* =========================================
   DETAIL CARD EXPAND
========================================= */
if (detailCard) {
  detailCard.addEventListener('click', () => {
    detailCard.classList.toggle('active');
  });
}

/* =========================================
   TRIAL MODE 3 MINUTES
========================================= */
player.on('timeupdate', () => {
  if (!isPremium && player.currentTime() >= 180) {
    player.pause();
    showToast('Trial Ended - Please Payment');
    detailCard.classList.add('active');
  }
});

/* =========================================
   PAYMENT BUTTON
========================================= */
document.getElementById('payment-btn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  /* PREMIUM */
  isPremium = true;
  showToast('Premium Activated');

  /* REDIRECT */
  setTimeout(() => {
    window.location.href = 'payment.html';
  }, 1200);
});

/* =========================================
   TOAST
========================================= */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}

/* =========================================
   LOAD MOVIE FROM HOME
========================================= */
const savedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

/* =========================================
   INITIAL RENDER
========================================= */
renderMovies(movies.slice(0, 4));

/* =========================================
   LOAD SELECTED MOVIE
========================================= */
if (savedMovie) {
  const matchedMovie = movies.find((movie) => movie.title === savedMovie.title);

  if (matchedMovie) {
    loadMovie(matchedMovie);
  } else {
    loadMovie(movies[0]);
  }
} else {
  loadMovie(movies[0]);
}
// ======================================================
// SEARCH MOVIE
// ======================================================

searchMovie.addEventListener("input", () => {

  console.log(searchMovie.value);

});