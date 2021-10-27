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
const messageController = require('./controllers/messageController');

app.use(express.json());

app.use(express.static(`${__dirname}/views`));
app.get('/', (req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

app.get('/messages', async (_req, res) => {
  const result = await messageController.findAll();
  res.status(200).json(result);
});

require('./sockets/message.js')(io);

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// Agradecimentos A Lucas Martins Turma 10 - Tribo B, pela orientação na estruturação do requisito 1 
//  Denis Rossati Turma 10 - Tribo B, pela elaboração da const 'newnickname'.