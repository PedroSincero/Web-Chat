require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 300;
// const { Server } = require('socket.io');
const io = require('socket.io')(http, {
  cors: {
    origin: `https://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(express.json());
// const io = Server(server);
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    const today = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${today} - ${nickname} - ${chatMessage}`);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// Agradecimentos A Lucas Martins Turma 10 - Tribo B, pela orientação na estruturação do requisito 1.