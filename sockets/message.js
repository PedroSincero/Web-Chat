const messageController = require('../controllers/messageController');

let nickNameDB = [];

const updateNick = (nickname, id, io) => {
  nickNameDB = nickNameDB.map((e) => (e.id === id ? { nickname, id } : e));
  io.emit('user', nickNameDB);
};

const newUser = (id, io) => {
  const nickname = id.split('').slice(0, 16).join('');
  nickNameDB.push({ nickname, id });
  io.emit('NewUser', nickNameDB);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    const { chatMessage, nickname } = msg;
    const today = new Date().toLocaleString().replace(/\//g, '-');
    await messageController.add(today, nickname, chatMessage);
    io.emit('message', `${today} - ${nickname} - ${chatMessage}`);
  });

  socket.on('NewUser', () => {
    newUser(socket.id, io);
  });

  socket.on('user', ({ nickname }) => {
    updateNick(nickname, socket.id, io);
  });

  socket.on('disconnect', () => {
    nickNameDB = nickNameDB.filter(({ id }) => id !== socket.id);
    io.emit('NewUser', nickNameDB);
  });
});