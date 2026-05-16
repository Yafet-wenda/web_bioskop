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
    banner: "img/spiderman.jpg",
    trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
    description: "Setelah peristiwa besar yang menghancurkan dunia, para Avengers yang tersisa bersatu kembali untuk membalikkan keadaan dan menyelamatkan alam semesta.",
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
    banner: "img/interstellar.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    description: "Sekelompok astronot melakukan perjalanan melalui wormhole demi mencari planet baru untuk kelangsungan hidup umat manusia.",
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
    banner: "img/suzume.jpg",
    trailer: "https://www.youtube.com/embed/IfKNOUUtyCA",
    description: "Suzume memulai perjalanan misterius untuk menutup pintu bencana yang muncul di seluruh Jepang.",
    schedules: ["11:00", "14:00", "18:00"]
  },
  {
    id: 4,
    title: "The Conjuring",
    genre: "Horror",
    duration: "1h 53m",
    rating: "7.5",
    status: "NOW SHOWING",
    image: "img/theconjuring.jpg",
    banner: "img/theconjuring.jpg",
    trailer: "https://www.youtube.com/embed/k10ETZ41m40",
    description: "Seorang pasangan suami istri yang baru saja pindah ke rumah tua di kota kecil mengalami kejadian misterius yang membuat mereka takut akan hidup mereka.",
    schedules: ["13:00", "16:00", "19:30"]
  }
];

// =========================
// GET ID
// =========================
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// =========================
// FIND MOVIE
// =========================
const movie = movies.find(item => item.id == movieId);

// =========================
// ELEMENT
// =========================
const hero = document.getElementById("hero");
const moviePoster = document.getElementById("moviePoster");
const movieTitle = document.getElementById("movieTitle");
const movieGenre = document.getElementById("movieGenre");
const movieDuration = document.getElementById("movieDuration");
const movieRating = document.getElementById("movieRating");
const movieDescription = document.getElementById("movieDescription");
const movieStatus = document.getElementById("movieStatus");
const scheduleContainer = document.getElementById("scheduleContainer");

// =========================
// SET MOVIE
// =========================
if (movie) {
  hero.style.backgroundImage = `url(${movie.banner})`;
  moviePoster.src = movie.image;
  movieTitle.innerText = movie.title;
  movieGenre.innerText = movie.genre;
  movieDuration.innerText = movie.duration;
  movieRating.innerText = movie.rating;
  movieDescription.innerText = movie.description;
  movieStatus.innerText = movie.status;

  // =========================
  // SCHEDULE DATA
  // =========================
  const schedules = [
    {
      day: "Sen",
      date: "15 Mei",
      times: ["13:00", "16:00", "19:30"]
    },
    {
      day: "Sel",
      date: "16 Mei",
      times: ["12:00", "15:00", "20:00"]
    },
    {
      day: "Rab",
      date: "17 Mei",
      times: ["14:00", "17:00", "21:00"]
    },
    {
      day: "Kam",
      date: "18 Mei",
      times: ["14:00", "17:00", "21:00"]
    }
  ];

  // RENDER
  schedules.forEach(item => {
    const card = document.createElement("div");
    card.className = "schedule-card";
    card.innerHTML = `
        <div class="schedule-top">
            <h3>${item.day}</h3>
            <p>${item.date}</p>
        </div>
        <div class="schedule-times">
            ${item.times.map(time => `
                <div class="time-item">
                    ${time}
                </div>
            `).join("")}
        </div>
    `;
    scheduleContainer.appendChild(card);
  });
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
function openSeatModal() {
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
  seatContainer.innerHTML = "";
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

  rows.forEach(row => {
    const seatRow = document.createElement("div");
    seatRow.classList.add("seat-row");

    // LABEL
    const label = document.createElement("div");
    label.classList.add("row-label");
    label.innerText = row;
    seatRow.appendChild(label);

    // SEAT
    for (let i = 1; i <= 12; i++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      const seatCode = `${row}${i}`;

      // CLICK
      seat.addEventListener("click", () => {
        // TOGGLE
        seat.classList.toggle("selected");

        // ADD
        if (seat.classList.contains("selected")) {
          selectedSeats.push(seatCode);
        }
        // REMOVE
        else {
          selectedSeats = selectedSeats.filter(item => item !== seatCode);
        }
        updatePayment();
      });
      seatRow.appendChild(seat);
    }
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

  // SAVE
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  localStorage.setItem("totalPrice", selectedSeats.length * ticketPrice);

  // REDIRECT
  window.location.href = "payment.html";
}

// =========================
// TRAILER MODAL
// =========================
const trailerModal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");

// =========================
// OPEN TRAILER
// =========================
function openTrailer() {
  trailerModal.classList.add("active");
  trailerFrame.src = movie.trailer + "?autoplay=1";
}

// =========================
// CLOSE TRAILER
// =========================
function closeTrailer() {
  trailerModal.classList.remove("active");
  trailerFrame.src = "";
}