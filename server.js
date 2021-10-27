require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(express.json());

app.use(express.static(`${__dirname}/views`));

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    const today = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${today} - ${nickname} - ${chatMessage}`);
  });

  const newNickname = socket.id.split('').slice(0, 16).join('');
  socket.emit('user', { message: newNickname });

  socket.on('user', ({ message }) => {
    io.emit('user', { message });
  });
  socket.broadcast.emit('newConnection', { message: `Usuário se conectou ${socket.id}` });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// Agradecimentos A Lucas Martins Turma 10 - Tribo B, pela orientação na estruturação do requisito 1 
//  Denis Rossati Turma 10 - Tribo B, pela elaboração da const 'newnickname'.