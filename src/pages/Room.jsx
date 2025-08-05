import React, { useState, useEffect } from 'react';
import socket from '../socket';

const Room = ({ setIsReady, setName, setRoom }) => {
  const [localName, setLocalName] = useState('');
  const [localRoom, setLocalRoom] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const createRoom = () => {
    const newRoom = Math.floor(Math.random() * 999 + 1).toString();
    setLocalRoom(newRoom);
    socket.connect();
    socket.emit('create_room', newRoom);
    alert(`Room created: ${newRoom}`);
  };

  const joinRoom = () => {
    if (!localName || !localRoom) return alert('Enter name and room');
    socket.connect();
    socket.emit('join_room', localRoom);

    setName(localName);
    setRoom(localRoom);
  };

  useEffect(() => {
    // Randomly choose background_1.jpg to background_5.jpg
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    setBackgroundImage(`/background_${randomIndex}.jpg`);
  }, []);

  useEffect(() => {
    socket.on('room_ready', () => {
      setIsReady(true);
    });
    return () => socket.off('room_ready');
  }, [setIsReady]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-50 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-300 border-opacity-30 text-white space-y-6 relative">
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div>

        <h1 className="relative text-5xl font-extrabold text-center tracking-wider text-cyan-300 animate-pulse drop-shadow-xl">
          CAT Quiz 1v1
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          className="relative w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-lg transition"
        />

        <div className="flex justify-between gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-blue-700 to-blue-900 hover:scale-105 hover:shadow-xl transition-all duration-300 text-white font-semibold py-3 rounded-xl"
            onClick={createRoom}
          >
            🚀 Create Room
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-green-700 to-green-900 hover:scale-105 hover:shadow-xl transition-all duration-300 text-white font-semibold py-3 rounded-xl"
            onClick={joinRoom}
          >
            🌌 Join Room
          </button>
        </div>

        <input
          type="text"
          placeholder="Room #"
          value={localRoom}
          onChange={(e) => setLocalRoom(e.target.value)}
          className="relative w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-lg transition"
        />

        <p className="text-sm text-center text-gray-300">
          Invite friends to your room using the room number!
        </p>
      </div>
    </div>
  );
};

export default Room;
