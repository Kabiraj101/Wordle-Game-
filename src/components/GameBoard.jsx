import Row from './Row.jsx';
import { checkGuess, MAX_GUESSES } from '../utils/checkGuess.js';

export default function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  return (
    <div className="board">
      {Array.from({ length: MAX_GUESSES }, (_, i) => {
        if (i < pastGuesses.length) {
          return <Row key={i} guess={pastGuesses[i]} statuses={checkGuess(pastGuesses[i], solutionWord)} />;
        }
        return <Row key={i} guess={i === pastGuesses.length ? currentGuess : ''} />;
      })}
    </div>
  );
}