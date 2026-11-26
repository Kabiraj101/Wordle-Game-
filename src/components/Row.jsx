import Tile from './Tile.jsx';
import { WORD_LENGTH } from '../utils/checkGuess.js';

export default function Row({ guess = '', statuses = [] }) {
  return (
    <div className="row">
      {Array.from({ length: WORD_LENGTH }, (_, i) => (
        <Tile key={i} letter={guess[i]} status={statuses[i]} />
      ))}
    </div>
  );
}