import React, { useState, useEffect } from 'react';
import socket from '../socket';

const Room = ({ setIsReady, setName, setRoom }) => {
  const [localName, setLocalName] = useState('');
  const [localRoom, setLocalRoom] = useState('');

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
    socket.on('room_ready', () => {
      setIsReady(true);
    });
    return () => socket.off('room_ready');
  }, [setIsReady]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-lg border border-white border-opacity-20 text-white space-y-6">
        <h1 className="text-4xl font-extrabold text-center tracking-wide animate-pulse">
           CAT Quiz 1v1
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-between gap-3">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-blue-500/50"
            onClick={createRoom}
          >
            Create Room
          </button>
          <button
            className="flex-1 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-green-500/50"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

        <input
          type="text"
          placeholder="Room #"
          value={localRoom}
          onChange={(e) => setLocalRoom(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <p className="text-sm text-center text-gray-300">
          Invite friends to your room using the room number!
        </p>
      </div>
    </div>
  );
};

export default Room;
