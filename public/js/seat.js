const rows = ["A","B","C","D","E","F","G","H"];
const cols = 12;
const price = 30000;

const occupiedSeats = ["A10","A11","A12","B4","D9","D10","F3","F4","H11","H12"];

const seatGrid = document.getElementById("seatGrid");
const numbers = document.getElementById("numbers");
const selectedSeatsText = document.getElementById("selectedSeats");
const totalPriceText = document.getElementById("totalPrice");

let selectedSeats = [];

/* NOMOR ATAS */
for (let i = 1; i <= cols; i++) {
  const num = document.createElement("div");
  num.textContent = i;
  numbers.appendChild(num);
}

/* BUAT GRID */
rows.forEach(row => {

  // label kiri
  const label = document.createElement("div");
  label.className = "row-label";
  label.textContent = row;
  seatGrid.appendChild(label);

  for (let i = 1; i <= cols; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");

    const seatCode = row + i;

    if (occupiedSeats.includes(seatCode)) {
      seat.classList.add("occupied");
    }

    seat.addEventListener("click", () => {
      if (seat.classList.contains("occupied")) return;

      seat.classList.toggle("selected");

      if (selectedSeats.includes(seatCode)) {
        selectedSeats = selectedSeats.filter(s => s !== seatCode);
      } else {
        selectedSeats.push(seatCode);
      }

      updateSummary();
    });

    seatGrid.appendChild(seat);
  }
});

/* UPDATE TOTAL */
function updateSummary() {
  selectedSeatsText.textContent = selectedSeats.join(", ") || "-";
  totalPriceText.textContent = "Rp " + (selectedSeats.length * price).toLocaleString();
}