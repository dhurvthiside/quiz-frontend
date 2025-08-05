// client/src/pages/QuizBattle.jsx
import React, { useState, useEffect } from 'react';
import socket from '../socket';

const QuizBattle = ({ name, room, onResult }) => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log('🧾 Props to QuizBattle:', { name, room });

    // Request questions from server
    socket.emit('get_questions', { roomId: room });

    // Receive questions
    socket.on('questions', (data) => {
      console.log('🧠 Received questions:', data);
      setQuestions(data);
    });

    return () => {
      socket.off('questions');
    };
  }, [room]);

  useEffect(() => {
    const intervalId = setInterval(() => setTimer((prev) => prev + 1), 1000);

    const handleGameResult = (data) => {
      clearInterval(intervalId);
      const you = data.player1.name === name ? data.player1 : data.player2;
      const opponent = data.player1.name === name ? data.player2 : data.player1;

      const result = {
        yourName: you.name,
        opponentName: opponent.name,
        yourScore: you.score,
        opponentScore: opponent.score,
        timer: you.time,
        winner: data.winner,
      };

      onResult(result);
    };

    socket.on('game_result', handleGameResult);

    return () => {
      clearInterval(intervalId);
      socket.off('game_result', handleGameResult);
    };
  }, [name, onResult]);

  const handleChange = (qid, ans) => {
    setAnswers((prev) => ({ ...prev, [qid]: ans }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    socket.emit('submit_quiz', {
      roomId: room,
      name,
      answers,
      time: timer,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10">
          <h2 className="text-2xl font-bold tracking-wide animate-fadeIn">🧠 Quiz Battle</h2>
          <p className="text-lg font-mono text-green-300 animate-pulse mt-2 sm:mt-0">
            ⏱ Time: {timer}s
          </p>
        </div>

        {/* Questions */}
        {questions.length === 0 ? (
          <p className="text-center text-xl mt-10 animate-pulse">Fetching questions...</p>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-white bg-opacity-10 backdrop-blur-lg text-white p-5 rounded-2xl shadow-xl border border-white/10"
            >
              <h3 className="font-semibold text-lg mb-3">
                 {q.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      answers[q.id] === opt
                        ? 'bg-green-500 text-white font-semibold'
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleChange(q.id, opt)}
                      className="form-radio text-green-400 accent-green-400"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
              submitted
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 hover:scale-105'
            }`}
          >
            {submitted ? 'Waiting for opponent…' : '🚀 Submit Quiz'}
          </button>

          {submitted && (
            <p className="mt-4 text-white text-center text-sm animate-pulse">
              Waiting for opponent to finish...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBattle;
