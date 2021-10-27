const socket = window.io();

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
const input = document.getElementById('input');
const chatMessage = input.value;
const nickname = document.getElementById('user').innerText;
// console.log(nickname);
e.preventDefault();
  socket.emit('message', { nickname, chatMessage });
  input.value = '';
});

const createMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  const messages = document.getElementById('messages');
  messages.appendChild(li);
};

const onlineUsers = (user) => {
  const onUsers = document.getElementById('user');
  onUsers.innerText = user;
  return false;
};

  const formUser = document.getElementById('new-user');

  formUser.addEventListener('submit', (e) => {
    const input = document.getElementById('input-nick');
    const message = input.value;
    console.log('Usuario novo : ', message);
    e.preventDefault();
    socket.emit('user', { message });
    input.value = '';
  });

window.onload = () => {
  socket.on('user', ({ message }) => onlineUsers(message));
};

socket.on('message', (message) => createMessage(message));
// socket.on('newConnection', ({ message }) => createMessage(message));