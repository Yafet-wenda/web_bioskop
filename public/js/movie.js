// =========================
// CINEMA TITLE
// =========================
const params = new URLSearchParams(window.location.search);
let cinema = params.get("cinema");

if (!cinema) {
  cinema = localStorage.getItem("selectedCinema");
}

document.getElementById("cinemaTitle").innerText = cinema || "CINEMAX Cinema";

// =========================
// MOVIES DATA
// =========================
const movies = [
  {
    id: 1,
    title: "Avengers Endgame",
    genre: "Action",
    duration: "3h 1m",
    rating: "9.0",
    status: "NOW SHOWING",
    image: "img/spiderman.jpg",
    schedules: ["13:00", "16:00", "19:30"]
  },
  {
    id: 2,
    title: "Interstellar",
    genre: "Drama",
    duration: "2h 49m",
    rating: "9.5",
    status: "NOW SHOWING",
    image: "img/interstellar.jpg",
    schedules: ["12:00", "15:30", "20:00"]
  },
  {
    id: 3,
    title: "Suzume",
    genre: "Anime",
    duration: "2h 10m",
    rating: "8.9",
    status: "COMING SOON",
    image: "img/suzume.jpg",
    schedules: ["11:00", "14:00", "18:00"]
  },
  {
    id: 4,
    title: "The Conjuring",
    genre: "Horror",
    duration: "2h 5m",
    rating: "8.2",
    status: "NOW SHOWING",
    image: "img/conjuring.jpg",
    schedules: ["15:00", "18:30", "21:30"]
  }
];

// =========================
// RENDER MOVIES
// =========================
const movieGrid = document.getElementById("movieGrid");
const emptyState = document.getElementById("emptyState");

function renderMovies(movieList) {
  movieGrid.innerHTML = "";

  if (movieList.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  movieList.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
        <div class="movie-status">${movie.status}</div>
        <div class="movie-rating">⭐ ${movie.rating}</div>
        <img src="${movie.image}" class="movie-poster">
        <div class="movie-content">
            <h2 class="movie-title">${movie.title}</h2>
            <p class="movie-info">${movie.genre} • ${movie.duration}</p>
            <div class="schedule">
                ${movie.schedules.map(time => `
                    <div class="time">${time}</div>
                `).join("")}
            </div>
            <div class="movie-buttons">
                <button class="btn btn-detail" onclick="openDetail(${movie.id})">Detail</button>
                <button class="btn btn-book" onclick="bookMovie(${movie.id})">Pesan</button>
            </div>
        </div>
    `;
    movieGrid.appendChild(card);
  });
}

renderMovies(movies);

// =========================
// SEARCH
// =========================
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(keyword)
  );
  renderMovies(filtered);
});

// =========================
// FILTER
// =========================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const category = button.dataset.filter;

    if (category === "all") {
      renderMovies(movies);
      return;
    }

    const filtered = movies.filter(movie => movie.genre === category);
    renderMovies(filtered);
  });
});

// =========================
// DETAIL PAGE
// =========================
function openDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

// =========================
// BACK
// =========================
function goBack() {
  window.history.back();
}

// =========================
// SEAT MODAL
// =========================
const seatModal = document.getElementById("seatModal");
const seatContainer = document.getElementById("seatContainer");
const totalPrice = document.getElementById("totalPrice");
const selectedSeatsText = document.getElementById("selectedSeats");
const ticketPrice = 45000;
let selectedSeats = [];

// =========================
// OPEN MODAL
// =========================
function bookMovie(id) {
  seatModal.classList.add("active");
  selectedSeats = [];
  updatePayment();
  generateSeats();
}

// =========================
// CLOSE MODAL
// =========================
function closeSeatModal() {
  seatModal.classList.remove("active");
}

// =========================
// GENERATE SEAT
// =========================
function generateSeats() {
  // RESET
  seatContainer.innerHTML = "";

  // ROW
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

  rows.forEach(row => {
    // ROW CONTAINER
    const seatRow = document.createElement("div");
    seatRow.classList.add("seat-row");

    // ROW LABEL
    const rowLabel = document.createElement("div");
    rowLabel.classList.add("row-label");
    rowLabel.innerText = row;
    seatRow.appendChild(rowLabel);

    // LOOP SEAT
    for (let i = 1; i <= 12; i++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      const seatCode = `${row}${i}`;

      // CLICK SEAT
      seat.addEventListener("click", () => {
        // JIKA SUDAH TERISI
        if (seat.classList.contains("occupied")) {
          return;
        }

        // TOGGLE SELECT
        seat.classList.toggle("selected");

        // ADD
        if (seat.classList.contains("selected")) {
          selectedSeats.push(seatCode);
        }
        // REMOVE
        else {
          selectedSeats = selectedSeats.filter(item => item !== seatCode);
        }

        // UPDATE
        updatePayment();
      });

      // APPEND SEAT
      seatRow.appendChild(seat);
    }

    // APPEND ROW
    seatContainer.appendChild(seatRow);
  });
}

// =========================
// UPDATE PAYMENT
// =========================
function updatePayment() {
  selectedSeatsText.innerText = selectedSeats.length > 0 ? selectedSeats.join(", ") : "-";
  const total = selectedSeats.length * ticketPrice;
  totalPrice.innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

// =========================
// PAYMENT
// =========================
function payNow() {
  // VALIDASI
  if (selectedSeats.length === 0) {
    alert("Pilih kursi terlebih dahulu!");
    return;
  }

  // SIMPAN DATA
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

  // TOTAL
  localStorage.setItem("totalPrice", selectedSeats.length * ticketPrice);

  // PINDAH KE PAYMENT
  window.location.href = "payment.html";
}