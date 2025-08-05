import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const Result = ({ result }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (result.yourScore >= result.opponentScore) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }

    // Random background (same system as Room.jsx)
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    setBackgroundImage(`/background_${randomIndex}.jpg`);
  }, [result]);

  const youWon = result.yourScore > result.opponentScore;
  const isDraw = result.yourScore === result.opponentScore;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative w-full max-w-xl p-8 sm:p-12 bg-black bg-opacity-50 backdrop-blur-xl rounded-3xl border border-cyan-300 border-opacity-30 shadow-2xl text-white text-center space-y-6 animate-float">
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"></div>

        <h1 className="relative text-5xl sm:text-6xl font-extrabold animate-pulse text-cyan-300 drop-shadow-xl">
          🏁 Quiz Over
        </h1>

        <div className="relative space-y-2 text-xl sm:text-2xl font-semibold">
          <p className="text-green-300 drop-shadow-md">👤 Your Score: {result.yourScore}</p>
          <p className="text-red-300 drop-shadow-md">🧑‍🤝‍🧑 Opponent Score: {result.opponentScore}</p>
          <p className="text-yellow-300 drop-shadow-md">⏱ Time Taken: {result.timer}s</p>
        </div>

        <h2
          className={`mt-6 text-4xl sm:text-5xl font-bold drop-shadow-lg ${
            youWon
              ? 'text-green-400 glow'
              : isDraw
              ? 'text-yellow-400'
              : 'text-red-500'
          }`}
        >
          {youWon
            ? '🎉 You Won!'
            : isDraw
            ? '🤝 It\'s a Draw!'
            : '😢 You Lost'}
        </h2>

        <style jsx>{`
          .glow {
            text-shadow: 0 0 15px #00ff88, 0 0 25px #00ff88, 0 0 35px #00ff88;
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Result;
