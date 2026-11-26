export default function Tile({ letter = '', status = '' }) {
  const classes = ['tile', status, letter && 'filled'].filter(Boolean).join(' ');
  return (
    <div className={classes} aria-label={letter ? `${letter} ${status || 'typed'}` : 'empty'}>
      {letter}
    </div>
  );
}