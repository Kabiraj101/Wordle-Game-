const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export default function Keyboard({ keyStatuses, onKey }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, r) => (
        <div className="keyboard-row" key={r}>
          {row.map((k) => (
            <button
              key={k}
              className={`key ${keyStatuses[k] || ''} ${k.length > 1 ? 'wide' : ''}`}
              onClick={(e) => {
                onKey(k);
                e.currentTarget.blur(); // stops Enter from re-clicking the focused key
              }}
            >
              {k === 'BACKSPACE' ? '⌫' : k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}