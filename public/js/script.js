// ======================================================
// CINEMAX DYNAMIC MOVIE SYSTEM
// ======================================================

// ======================================================
// DATA FILM
// ======================================================
const movies = [
  {
    title: "Avatar: Fire and Ash",
     category: "Fantasy",
    rating: "8.5",
    image: "img/avatar.webp",
    description: "Petualangan epik terbaru Pandora dengan visual sinematik luar biasa.",
    info: "13+ | Fantasy, Adventure | 3h 18m"
  },
  {
    title: "Star Wars: The Phantom Menace",
      category: "Sci-Fi",
    rating: "9.0",
    image: "img/film6.webp",
    description: "Perjalanan awal Anakin Skywalker dalam dunia galaksi Star Wars.",
    info: "PG | Sci-Fi, Action | 2h 16m"
  },
  {
    title: "Solo: A Star Wars Story",
      category: "Sci-Fi",
    rating: "7.8",
    image: "img/film3.webp",
    description: "Asal mula Han Solo menjadi penyelundup legendaris galaksi.",
    info: "PG-13 | Adventure | 2h 15m"
  },
  {
    title: "Predator: Padang Pasir",
    category: "Action",
    rating: "8.2",
    image: "img/film4.webp",
    description: "Makhluk pemburu mematikan kembali meneror gurun mematikan.",
    info: "13+ | Action, Sci-Fi | 1h 47m"
  },
  {
    title: "Mercy",
    category: "Thriller",
    rating: "8.2",
    image: "img/film5.webp",
    description: "Thriller futuristik penuh aksi dan misteri teknologi modern.",
    info: "13+ | Crime, Thriller | 1h 39m"
  },
  {
    title: "A Wrinkle in Time",
    category: "Fantasy",
    rating: "8.1",
    image: "img/film2.webp",
    description: "Perjalanan lintas dimensi penuh fantasi dan petualangan keluarga.",
    info: "6+ | Family, Fantasy | 2h 8m"
  },
  {
    title: "Under Wraps 2",
    category: "Comedy",
    rating: "8.0",
    image: "img/film7.webp",
    description: "Komedi keluarga dengan petualangan mumi yang seru dan lucu.",
    info: "G | Comedy, Family | 1h 23m"
  },
  {
    title: "Genius",
    category: "Comedy",
    rating: "7.9",
    image: "img/film4.webp",
    description: "Film keluarga klasik penuh inspirasi dan humor ringan.",
    info: "G | Comedy | 1h 22m"
  },
{
  title: "The Nun",
  category: "Horror",
  rating: "7.5",
  image: "img/nun.webp",
  description: "Teror biarawati iblis yang menghantui sebuah gereja tua.",
  info: "17+ | Horror | 1h 36m"
},
{
  title: "Your Name",
  category: "Anime",
  rating: "8.9",
  image: "img/yourname.webp",
  description: "Kisah romantis anime tentang dua remaja yang saling bertukar tubuh.",
  info: "13+ | Anime, Romance | 1h 52m"
}
];

// ======================================================
// ELEMENT
// ======================================================
const movieGrid = document.getElementById("movieGrid");
const heroBanner = document.getElementById("heroBanner");
const heroPoster = document.getElementById("heroPoster");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const btnLihatSemua = document.getElementById("btnLihatSemua");
const searchMovie = document.getElementById("search-movie");
const categoryButtons = document.querySelectorAll(".category-list a");
let activeCategory = "all";
let searchValue = "";
function renderMovies(limit = 4) {

  movieGrid.innerHTML = "";

  // =========================================
  // FILTER MOVIES
  // =========================================
  let filteredMovies = movies.filter(movie => {

    // CATEGORY
    const matchCategory =
      activeCategory === "all" ||
      movie.category === activeCategory;

    // SEARCH
    const matchSearch =
      movie.title.toLowerCase().includes(searchValue);

    return matchCategory && matchSearch;

  });

  // =========================================
  // EMPTY MOVIE
  // =========================================
  if(filteredMovies.length === 0){

    movieGrid.innerHTML = `
      <p class="empty-movie">
        Film tidak ditemukan.
      </p>
    `;

    return;
  }

  // =========================================
  // LIMIT
  // =========================================
  filteredMovies
    .slice(0, limit)
    .forEach((movie, index) => {

      const movieCard = document.createElement("div");

      movieCard.classList.add("movie-card");

      if(index === 0){
        movieCard.classList.add("active-movie");
      }

      movieCard.innerHTML = `
        <div class="card-img">

          <img src="${movie.image}" alt="${movie.title}">

          <div class="rating">
            ${movie.rating}
          </div>

        </div>

        <div class="card-info">

          <h3>${movie.title}</h3>

          <p>${movie.info}</p>

          <button
            class="btn-card"
            onclick="openMovie('${movie.title}')"
          >
            Detail Film
          </button>

        </div>
      `;

      // CLICK CARD
      movieCard.addEventListener("click", () => {

        updateHero(movie);

        document.querySelectorAll(".movie-card").forEach(card => {
          card.classList.remove("active-movie");
        });

        movieCard.classList.add("active-movie");

        document.getElementById("heroBanner").scrollIntoView({
          behavior: "smooth"
        });

      });

      movieGrid.appendChild(movieCard);

    });

}

// ======================================================
// UPDATE HERO
// ======================================================
function updateHero(movie) {

  // CHECK LIGHT MODE
  const isLight =
    document.body.classList.contains("light-theme");

  // OVERLAY
  const overlay = isLight
    ? `
      linear-gradient(
        to right,
        rgba(255,255,255,0.92) 20%,
        rgba(255,255,255,0.55) 45%,
        rgba(255,255,255,0.10) 100%
      )
    `
    : `
      linear-gradient(
        to right,
        rgba(15,23,42,0.98) 20%,
        rgba(15,23,42,0.75) 45%,
        rgba(15,23,42,0.35) 100%
      )
    `;

  // UPDATE BACKGROUND
  heroBanner.style.background = `
    ${overlay},
    url('${movie.image}') center/cover no-repeat
  `;

  // UPDATE CONTENT
  heroPoster.src = movie.image;
  heroTitle.textContent = movie.title;
  heroDesc.textContent = movie.description;
}

// ======================================================
// OPEN MOVIE
// ======================================================
function openMovie(movieTitle) {
  const selectedMovie = movies.find(movie => movie.title === movieTitle);
  localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
  window.location.href = "watch.html";
}

// ======================================================
// BUTTON LIHAT SEMUA
// ======================================================
btnLihatSemua.addEventListener("click", () => {
  renderMovies(movies.length);
  btnLihatSemua.style.display = "none";
});

// ======================================================
// AUTO HERO PERTAMA
// ======================================================
updateHero(movies[0]);

// ======================================================
// FIRST RENDER
// ======================================================
renderMovies();

// ======================================================
// SLIDESHOW
// ======================================================
function autoSlide(slideshowId) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500);
}

autoSlide("studio-slideshow");
autoSlide("seat-slideshow");

// =========================================
// LOGIN BUTTON
// =========================================
document.getElementById('loginBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'login.html';
});

// =========================================
// REGISTER BUTTON
// =========================================
document.getElementById('registerBtn')?.addEventListener('click', () => {
  window.location.href = 'register.html';
});

// =========================================
// START NOW BUTTON
// =========================================
document.getElementById('startNowBtn')?.addEventListener('click', () => {
  document.getElementById('kardfilm').scrollIntoView({
    behavior: 'smooth'
  });
});

/* =========================================
   START STREAMING BUTTON
========================================= */
document.getElementById('startStreamingBtn')?.addEventListener('click', () => {
  window.location.href = 'watch.html';
});
// =========================================
// SEARCH MOVIE
// =========================================
searchMovie.addEventListener("input", (e) => {

  searchValue = e.target.value.toLowerCase();

  renderMovies();

});
// =========================================
// CATEGORY FILTER
// =========================================
categoryButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    e.preventDefault();

    // REMOVE ACTIVE
    categoryButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    // ACTIVE BUTTON
    button.classList.add("active");

    // SAVE CATEGORY
    activeCategory =
      button.dataset.category;

    // RENDER MOVIES
    renderMovies();
  });

});