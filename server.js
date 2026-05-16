// ======================================================
// CINEMAX REALTIME SERVER
// server.js
// ======================================================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// ======================================================
// APP
// ======================================================

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// ======================================================
// PORT
// ======================================================

const PORT = 3000;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ======================================================
// MOVIE DATA
// ======================================================

const movies = [
    {
        id: 1,
        title: "Avatar: Fire and Ash",
        price: 35000,
        studio: "Studio 1",
        times: ["13:00", "16:00", "19:00"]
    },
    {
        id: 2,
        title: "Star Wars: The Phantom Menace",
        price: 40000,
        studio: "Studio 2",
        times: ["14:00", "17:00", "20:00"]
    },
    {
        id: 3,
        title: "Solo: A Star Wars Story",
        price: 30000,
        studio: "Studio 3",
        times: ["12:00", "15:00", "18:00"]
    }
];

// ======================================================
// ROOM SEAT STORAGE
// ======================================================

const bookedSeats = {
    "Avatar: Fire and Ash-13:00": [],
    "Avatar: Fire and Ash-16:00": [],
    "Avatar: Fire and Ash-19:00": [],
    "Star Wars: The Phantom Menace-14:00": [],
    "Star Wars: The Phantom Menace-17:00": [],
    "Star Wars: The Phantom Menace-20:00": [],
    "Solo: A Star Wars Story-12:00": [],
    "Solo: A Star Wars Story-15:00": [],
    "Solo: A Star Wars Story-18:00": []
};

// ======================================================
// API ROUTES
// ======================================================

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET MOVIES
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// GET SEATS
app.get('/api/seats/:room', (req, res) => {
    const room = req.params.room;
    res.json({ room, seats: bookedSeats[room] || [] });
});

// ======================================================
// SOCKET CONNECTION
// ======================================================

io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    // JOIN ROOM
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(socket.id + ' joined ' + room);

        // KIRIM KURSI TERPAKAI
        socket.emit('initSeats', bookedSeats[room] || []);
    });

    // SELECT SEAT
    socket.on('selectSeat', ({ room, seat }) => {
        if (!bookedSeats[room]) bookedSeats[room] = [];

        // VALIDASI
        if (!bookedSeats[room].includes(seat)) {
            bookedSeats[room].push(seat);
            console.log(`Seat ${seat} booked in ${room}`);

            // KIRIM KE ROOM
            io.to(room).emit('seatBooked', seat);
        }
    });

    // RELEASE SEAT
    socket.on('releaseSeat', ({ room, seat }) => {
        if (!bookedSeats[room]) return;

        bookedSeats[room] = bookedSeats[room].filter(s => s !== seat);
        io.to(room).emit('seatReleased', seat);
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        console.log('User Disconnected:', socket.id);
    });
});

// ======================================================
// SERVER START
// ======================================================

server.listen(PORT, () => {
    console.log(`
==================================================
CINEMAX SERVER RUNNING
==================================================

Local:
http://localhost:${PORT}

==================================================
`);
});
