const messageController = require('../controllers/messageController');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    const { chatMessage, nickname } = msg;
    const today = new Date().toLocaleString().replace(/\//g, '-');
    await messageController.add(today, nickname, chatMessage);
    io.emit('message', `${today} - ${nickname} - ${chatMessage}`);
  });

  const newNickname = socket.id.split('').slice(0, 16).join('');
  socket.emit('user', { message: newNickname });

  socket.on('user', ({ message }) => {
    io.emit('user', { message });
  });
  socket.broadcast.emit('newConnection', { message: `Usuário se conectou ${socket.id}` });
});