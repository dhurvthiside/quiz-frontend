import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Result = ({ result }) => {
  useEffect(() => {
    if (result.yourScore >= result.opponentScore) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [result]);

  const youWon = result.yourScore > result.opponentScore;
  const isDraw = result.yourScore === result.opponentScore;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] px-4 py-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 sm:p-12 max-w-xl w-full text-white shadow-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold animate-pulse text-white drop-shadow-lg">
          🏁 Quiz Over
        </h1>

        <div className="space-y-2 text-lg sm:text-xl font-medium">
          <p className="text-green-300">👤 Your Score: {result.yourScore}</p>
          <p className="text-red-300">🧑‍🤝‍🧑 Opponent Score: {result.opponentScore}</p>
          <p className="text-yellow-300">⏱ Time Taken: {result.timer}s</p>
        </div>

        <h2
          className={`mt-6 text-3xl sm:text-4xl font-bold ${
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
            text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Result;
