const socket = window.io();

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
const input = document.getElementById('input');
const chatMessage = input.value;
const nickname = document.getElementById('user').innerText;
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
    e.preventDefault();
    socket.emit('user', { message });
    input.value = '';
  });

window.onload = () => {
  fetch('http://localhost:3000/messages')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((message) => createMessage(message));
  });
  socket.on('user', ({ message }) => onlineUsers(message));
};

socket.on('message', (message) => createMessage(message));

// Agradecimentos a Daniel Roberto - Turma 10 - Tribo B - Pela explicação da funcionalidade do fetch