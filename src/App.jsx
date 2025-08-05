import React, { useState } from 'react';
import Room from './pages/Room';
import QuizBattle from './pages/QuizBattle';
import Result from './pages/Result';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      {!isReady && !result && (
        <Room
          setIsReady={setIsReady}
          setName={setName}
          setRoom={setRoom}
        />
      )}
      {isReady && !result && (
        <QuizBattle
          name={name}
          room={room}
          onResult={(res) => setResult(res)}
        />
      )}
      {result && <Result result={result} />}
    </div>
  );
}

export default App;
