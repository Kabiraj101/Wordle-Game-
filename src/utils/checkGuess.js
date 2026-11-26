export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

const RANK = { absent: 1, present: 2, correct: 3 };

/**
 * Score a guess against the solution. Returns an array of 5 statuses:
 * 'correct' (green), 'present' (yellow) or 'absent' (gray).
 * Two passes make duplicate letters behave like the real game.
 */
export function checkGuess(guess, solution) {
  const result = Array(WORD_LENGTH).fill('absent');
  const remaining = {}; // letters of the solution not yet matched exactly

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) result[i] = 'correct';
    else remaining[solution[i]] = (remaining[solution[i]] || 0) + 1;
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    if (remaining[guess[i]] > 0) {
      result[i] = 'present';
      remaining[guess[i]]--;
    }
  }
  return result;
}

/** Best status seen for every letter, used to colour the on-screen keyboard. */
export function getKeyStatuses(pastGuesses, solution) {
  const keys = {};
  pastGuesses.forEach((guess) => {
    checkGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i];
      if (!keys[letter] || RANK[status] > RANK[keys[letter]]) keys[letter] = status;
    });
  });
  return keys;
}
