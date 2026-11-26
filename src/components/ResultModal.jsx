export default function ResultModal({ gameStatus, solutionWord, attempts, onRestart }) {
  const won = gameStatus === 'WON';
  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>{won ? '🎉 You won!' : 'Game over'}</h2>
        <p>
          {won
            ? `You found the word in ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`
            : 'You ran out of guesses. The word was:'}
        </p>
        {!won && <p className="reveal">{solutionWord}</p>}
        <button className="primary" onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
}