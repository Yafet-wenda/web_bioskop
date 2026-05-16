// ======================================================
// CINEMAX DYNAMIC MOVIE SYSTEM
// ======================================================

// ======================================================
// DATA FILM
// ======================================================
const movies = [
  {
    title: "Avatar: Fire and Ash",
    rating: "8.5",
    image: "img/avatar.webp",
    description: "Petualangan epik terbaru Pandora dengan visual sinematik luar biasa.",
    info: "13+ | Fantasy, Adventure | 3h 18m"
  },
  {
    title: "Star Wars: The Phantom Menace",
    rating: "9.0",
    image: "img/film6.webp",
    description: "Perjalanan awal Anakin Skywalker dalam dunia galaksi Star Wars.",
    info: "PG | Sci-Fi, Action | 2h 16m"
  },
  {
    title: "Solo: A Star Wars Story",
    rating: "7.8",
    image: "img/film3.webp",
    description: "Asal mula Han Solo menjadi penyelundup legendaris galaksi.",
    info: "PG-13 | Adventure | 2h 15m"
  },
  {
    title: "Predator: Padang Pasir",
    rating: "8.2",
    image: "img/film4.webp",
    description: "Makhluk pemburu mematikan kembali meneror gurun mematikan.",
    info: "13+ | Action, Sci-Fi | 1h 47m"
  },
  {
    title: "Mercy",
    rating: "8.2",
    image: "img/film5.webp",
    description: "Thriller futuristik penuh aksi dan misteri teknologi modern.",
    info: "13+ | Crime, Thriller | 1h 39m"
  },
  {
    title: "A Wrinkle in Time",
    rating: "8.1",
    image: "img/film2.webp",
    description: "Perjalanan lintas dimensi penuh fantasi dan petualangan keluarga.",
    info: "6+ | Family, Fantasy | 2h 8m"
  },
  {
    title: "Under Wraps 2",
    rating: "8.0",
    image: "img/film7.webp",
    description: "Komedi keluarga dengan petualangan mumi yang seru dan lucu.",
    info: "G | Comedy, Family | 1h 23m"
  },
  {
    title: "Genius",
    rating: "7.9",
    image: "img/film4.webp",
    description: "Film keluarga klasik penuh inspirasi dan humor ringan.",
    info: "G | Comedy | 1h 22m"
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

// ======================================================
// RENDER MOVIES
// ======================================================
function renderMovies(limit = 4) {
  movieGrid.innerHTML = "";

  movies.slice(0, limit).forEach((movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    if (index === 0) {
      movieCard.classList.add("active-movie");
    }

    movieCard.innerHTML = `
        <div class="card-img">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="rating">${movie.rating}</div>
        </div>
        <div class="card-info">
            <h3>${movie.title}</h3>
            <p>${movie.info}</p>
            <button class="btn-card" onclick="openMovie('${movie.title}')">Detail Film</button>
        </div>
    `;

    // ======================================================
    // CLICK CARD
    // ======================================================
    movieCard.addEventListener("click", () => {
      // UPDATE HERO
      updateHero(movie);

      // REMOVE ACTIVE
      document.querySelectorAll(".movie-card").forEach(card => {
        card.classList.remove("active-movie");
      });

      // ACTIVE CARD
      movieCard.classList.add("active-movie");

      // ==================================================
      // SCROLL KE HERO BANNER
      // ==================================================
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
  heroBanner.style.background = `
    linear-gradient(
      to right,
      rgba(15,23,42,0.98) 20%,
      rgba(15,23,42,0.75) 45%,
      rgba(15,23,42,0.35) 100%
    ),
    url('${movie.image}') center/cover no-repeat
  `;

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