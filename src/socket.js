// src/socket.js
import { io } from 'socket.io-client';

const socket = io('https://quiz-backend-gb5i.onrender.com', {
  autoConnect: false,
});

export default socket;
