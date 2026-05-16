/* ========================================
   CINEMAX BIOSKOP - FULL FUNCTIONALITY
   Version 2.2 - Fixed Cinema Card Navigation
======================================== */

// =========================
// DOM ELEMENTS
// =========================
const container = document.getElementById('card-container');
const modal = document.getElementById('infoModal');
const searchInput = document.querySelector('.search-box input');
const locationInput = document.querySelector('.location-input-field');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// =========================
// CINEMA DATA
// =========================
const cinemaData = {
    "Ciputra World XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI", "IMAX"],
        prices: {
            weekday: "Rp 35.000",
            weekend: "Rp 45.000",
            regular: "Rp 30.000"
        },
        distance: "2.3 km",
        rating: 4.8
    },
    "Pakuwon Mall XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 32.000",
            weekend: "Rp 42.000",
            regular: "Rp 28.000"
        },
        distance: "4.1 km",
        rating: 4.6
    },
    "Fairway Nine XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 30.000",
            weekend: "Rp 40.000",
            regular: "Rp 28.000"
        },
        distance: "5.0 km",
        rating: 4.5
    },
    "Tunjungan Plaza XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI", "Premium"],
        prices: {
            weekday: "Rp 38.000",
            weekend: "Rp 48.000",
            regular: "Rp 33.000"
        },
        distance: "1.8 km",
        rating: 4.9
    },
    "Grand City XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 31.000",
            weekend: "Rp 41.000",
            regular: "Rp 29.000"
        },
        distance: "3.4 km",
        rating: 4.4
    },
    "Galaxy Mall XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 34.000",
            weekend: "Rp 44.000",
            regular: "Rp 30.000"
        },
        distance: "6.2 km",
        rating: 4.7
    },
    "Royal Plaza XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 30.000",
            weekend: "Rp 39.000",
            regular: "Rp 27.000"
        },
        distance: "2.7 km",
        rating: 4.3
    },
    "Delta Plaza XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 33.000",
            weekend: "Rp 43.000",
            regular: "Rp 29.000"
        },
        distance: "1.5 km",
        rating: 4.6
    },
    "Lotte Mart XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 31.000",
            weekend: "Rp 40.000",
            regular: "Rp 28.000"
        },
        distance: "5.9 km",
        rating: 4.2
    },
    "Transmart XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 29.000",
            weekend: "Rp 38.000",
            regular: "Rp 26.000"
        },
        distance: "4.4 km",
        rating: 4.1
    },
    "City of Tomorrow XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 32.000",
            weekend: "Rp 41.000",
            regular: "Rp 28.000"
        },
        distance: "7.2 km",
        rating: 4.4
    },
    "Lenmarc XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 33.000",
            weekend: "Rp 42.000",
            regular: "Rp 29.000"
        },
        distance: "6.7 km",
        rating: 4.5
    },
    "Pakuwon City XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 34.000",
            weekend: "Rp 44.000",
            regular: "Rp 30.000"
        },
        distance: "8.1 km",
        rating: 4.7
    },
    "East Coast XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 35.000",
            weekend: "Rp 45.000",
            regular: "Rp 31.000"
        },
        distance: "8.4 km",
        rating: 4.8
    },
    "Pasar Atom XXI": {
        img: "img/rauangfilm.jpg",
        studios: ["Cinema XXI"],
        prices: {
            weekday: "Rp 28.000",
            weekend: "Rp 37.000",
            regular: "Rp 25.000"
        },
        distance: "3.1 km",
        rating: 4.0
    }
};

// =========================
// CINEMA LIST
// =========================
const cinemaNames = Object.keys(cinemaData);

// =========================
// INIT APP
// =========================
document.addEventListener('DOMContentLoaded', function () {
    generateCinemaCards();
    initEventListeners();
    highlightActiveNav();
});

// =========================
// GENERATE CARDS
// =========================
function generateCinemaCards(filteredNames = cinemaNames) {
    container.innerHTML = `
        <div class="loading-spinner">
            <span class="material-symbols-outlined">local_cinema</span>
            Loading bioskops...
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = '';
        filteredNames.forEach(name => {
            const data = cinemaData[name];
            const card = createCinemaCard(name, data);
            container.appendChild(card);
        });
    }, 500);
}

// =========================
// CREATE CARD
// =========================
function createCinemaCard(name, data) {
    const card = document.createElement('div');
    card.className = 'cinema-card';
    card.innerHTML = `
        <div class="card-left">
            <h3>${name}</h3>
            <p class="distance">${data.distance} • ⭐ ${data.rating}</p>
            <button class="btn-info" onclick="openModal(event,'${name}')">
                <span class="material-symbols-outlined">info</span>
                Info Bioskop
            </button>
        </div>
        <div class="card-right">
            <span class="material-symbols-outlined">chevron_right</span>
        </div>
    `;

    // CLICK CARD
    card.onclick = function () {
        goToCinema(name);
    };

    return card;
}

// =========================
// GO TO MOVIE PAGE
// =========================
function goToCinema(cinemaName) {
    // SAVE CINEMA
    localStorage.setItem('selectedCinema', cinemaName);
    // REDIRECT
    window.location.href = `movie.html?cinema=${encodeURIComponent(cinemaName)}`;
}

// =========================
// OPEN MODAL
// =========================
function openModal(event, cinemaName) {
    // STOP REDIRECT
    event.stopPropagation();
    const data = cinemaData[cinemaName];
    if (!data) return;

    // IMAGE
    document.querySelector('.modal-img').src = data.img;
    // STUDIO
    document.querySelector('.studio-tag').textContent = data.studios.join(', ');

    // PRICES
    const priceList = document.querySelector('.price-list');
    priceList.innerHTML = `
        <li>Hari Biasa: <span>${data.prices.weekday}</span></li>
        <li>Akhir Pekan: <span>${data.prices.weekend}</span></li>
        <li>Regular: <span>${data.prices.regular}</span></li>
    `;

    // TITLE
    document.querySelector('.modal-label').textContent = cinemaName;
    // SHOW
    modal.style.display = "flex";
}

// =========================
// CLOSE MODAL
// =========================
function closeModal() {
    modal.style.display = "none";
}

// =========================
// SEARCH SYSTEM
// =========================
function initSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = cinemaNames.filter(name => 
            name.toLowerCase().includes(query)
        );
        generateCinemaCards(filtered);
    });
}

// =========================
// LOCATION FILTER
// =========================
function initLocation() {
    locationInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = cinemaNames.filter(name => 
            name.toLowerCase().includes(query) || 
            cinemaData[name]?.distance.includes(query)
        );
        generateCinemaCards(filtered);
    });
}

// =========================
// MOBILE MENU
// =========================
function initMobileMenu() {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// =========================
// ACTIVE NAVIGATION
// =========================
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// =========================
// EVENTS
// =========================
function initEventListeners() {
    initSearch();
    initLocation();
    initMobileMenu();

    // CLOSE MODAL OUTSIDE
    window.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };

    // ESC CLOSE
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// =========================
// TOAST
// =========================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// =========================
// GEOLOCATION
// =========================
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('User location:', position.coords);
            },
            () => {
                console.log('Location access denied');
            }
        );
    }
}

// =========================
// START
// =========================
getUserLocation();