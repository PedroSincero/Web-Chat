const socket = window.io();

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
const input = document.getElementById('input');
const chatMessage = input.value;
const nickname = document.getElementById('user').firstChild.innerText;
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

const newUser = (user) => {
  const onUsers = document.getElementById('user');
  onUsers.innerHTML = '';
  user.forEach(({ nickname, id }) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = nickname;
    if (id === socket.id) {
      onUsers.prepend(li);
    } else {
      onUsers.appendChild(li);
    }
  });
};

const formUser = document.getElementById('new-user');

  formUser.addEventListener('submit', (e) => {
    const input = document.getElementById('input-nick');
    const nickname = input.value;
    e.preventDefault();
    socket.emit('user', { nickname });
    input.value = '';
  });

window.onload = () => {
  fetch('http://localhost:3000/messages')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((message) => createMessage(message));
  });
};
socket.emit('NewUser');

socket.on('NewUser', (message) => newUser(message));

socket.on('message', (message) => createMessage(message));
socket.on('user', (message) => newUser(message));
// Agradecimentos a Daniel Roberto - Turma 10 - Tribo B - Pela explicação da funcionalidade do fetch
// Agradecimentos a Ederson 