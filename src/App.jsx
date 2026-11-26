import { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import ResultModal from './components/ResultModal.jsx';
import { WORDS } from './utils/words.js';
import { getKeyStatuses, WORD_LENGTH, MAX_GUESSES } from './utils/checkGuess.js';
import './App.css';

const pickWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function App() {
  // Centralised game state
  const [solutionWord, setSolutionWord] = useState(pickWord); // hidden target
  const [currentGuess, setCurrentGuess] = useState('');       // string being typed
  const [pastGuesses, setPastGuesses] = useState([]);         // completed guesses
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // IN_PROGRESS | WON | LOST
  const [message, setMessage] = useState('');

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 1400);
  };

  // One handler shared by the physical and the on-screen keyboard.
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS') return; // input is halted after win/loss

      if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) return flash('Not enough letters');
        const updated = [...pastGuesses, currentGuess];
        setPastGuesses(updated);
        setCurrentGuess('');
        if (currentGuess === solutionWord) setGameStatus('WON');
        else if (updated.length === MAX_GUESSES) setGameStatus('LOST');
      } else if (key === 'BACKSPACE') {
        setCurrentGuess((g) => g.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((g) => g + key);
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord]
  );

  // Physical keyboard: attach once per handler change, always clean up.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return; // leave browser shortcuts alone
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const restart = () => {
    setSolutionWord(pickWord());
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
  };

  return (
    <main className="app">
      <h1>WORDLE</h1>
      <p className="toast" aria-live="polite">{message}</p>
      <GameBoard pastGuesses={pastGuesses} currentGuess={currentGuess} solutionWord={solutionWord} />
      <Keyboard keyStatuses={getKeyStatuses(pastGuesses, solutionWord)} onKey={handleKey} />
      {gameStatus !== 'IN_PROGRESS' && (
        <ResultModal
          gameStatus={gameStatus}
          solutionWord={solutionWord}
          attempts={pastGuesses.length}
          onRestart={restart}
        />
      )}
    </main>
  );
}