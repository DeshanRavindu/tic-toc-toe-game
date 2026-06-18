import React, { useState } from 'react';
import './App.css';

// ───────────────────────────────────────────
// Win detection (works for any board size n)
// ───────────────────────────────────────────
function calculateWinner(squares, n) {
  const lines = [];

  // Rows
  for (let r = 0; r < n; r++) {
    lines.push(Array.from({ length: n }, (_, c) => r * n + c));
  }
  // Columns
  for (let c = 0; c < n; c++) {
    lines.push(Array.from({ length: n }, (_, r) => r * n + c));
  }
  // Diagonals
  lines.push(Array.from({ length: n }, (_, i) => i * n + i));
  lines.push(Array.from({ length: n }, (_, i) => i * n + (n - 1 - i)));

  for (const line of lines) {
    const first = squares[line[0]];
    if (first && line.every(i => squares[i] === first)) {
      return { winner: first, line };
    }
  }
  return null;
}

// ───────────────────────────────────────────
// Board size options
// ───────────────────────────────────────────
const SIZES = [
  { n: 3, label: '3 × 3', sub: 'Classic' },
  { n: 4, label: '4 × 4', sub: 'Medium' },
  { n: 5, label: '5 × 5', sub: 'Large' },
  { n: 6, label: '6 × 6', sub: 'Expert' },
];

// ───────────────────────────────────────────
// Home Screen
// ───────────────────────────────────────────
const HomeScreen = ({ onStart }) => (
  <div className="screen home-screen">
    <div className="logo">
      <span className="logo-x">X</span>O<span className="logo-o">X</span>
    </div>
    <p className="tagline">The classic game, now with more grids</p>
    <button className="btn-main" onClick={onStart}>Start game</button>
    <button className="btn-exit" onClick={() => {
    const w = window.open('', '_self');
    w.close();
  }}>Exit</button>
  </div>
);

// ───────────────────────────────────────────
// Size Select Screen
// ───────────────────────────────────────────
const SizeScreen = ({ onSelect, onBack }) => (
  <div className="screen size-screen">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <h2 className="page-title">Choose board size</h2>
    <p className="page-sub">Pick a grid to play on</p>

    <div className="size-grid">
      {SIZES.map(s => (
        <button key={s.n} className="size-card" onClick={() => onSelect(s.n)}>
          <div
            className="size-preview"
            style={{
              gridTemplateColumns: `repeat(${s.n}, 1fr)`,
              gridTemplateRows: `repeat(${s.n}, 1fr)`,
            }}
          >
            {Array(s.n * s.n).fill(null).map((_, i) => (
              <div key={i} className="preview-dot" />
            ))}
          </div>
          <span className="size-label">{s.label}</span>
          <span className="size-sub">{s.sub}</span>
        </button>
      ))}
    </div>
  </div>
);

// ───────────────────────────────────────────
// Game Screen
// ───────────────────────────────────────────
const GameScreen = ({ boardSize, onBack }) => {
  const total = boardSize * boardSize;
  const [squares, setSquares]   = useState(Array(total).fill(null));
  const [xIsNext, setXIsNext]   = useState(true);
  const [scores, setScores]     = useState({ X: 0, O: 0, D: 0 });

  const result   = calculateWinner(squares, boardSize);
  const winner   = result?.winner;
  const winLine  = result?.line ?? [];
  const isDraw   = !winner && squares.every(s => s !== null);
  const gameOver = !!winner || isDraw;

  const handleClick = (i) => {
    if (squares[i] || gameOver) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';

    const newResult = calculateWinner(next, boardSize);
    const newWinner = newResult?.winner;
    const newDraw   = !newResult && next.every(s => s !== null);

    if (newWinner) {
      setScores(prev => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
    } else if (newDraw) {
      setScores(prev => ({ ...prev, D: prev.D + 1 }));
    }

    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const resetRound = () => {
    setSquares(Array(total).fill(null));
    setXIsNext(true);
  };

  // Cell sizing — responsive
  const maxW    = Math.min(typeof window !== 'undefined' ? window.innerWidth - 48 : 360, 420);
  const gap     = 6;
  const cellPx  = Math.floor((maxW - gap * (boardSize - 1)) / boardSize);
  const fontPx  = Math.max(13, Math.floor(cellPx * 0.44));

  let statusText, statusClass;
  if (winner) {
    statusText  = `${winner === 'X' ? 'Player 1' : 'Player 2'} wins! 🎉`;
    statusClass = winner === 'X' ? 'status x-wins' : 'status o-wins';
  } else if (isDraw) {
    statusText  = "It's a draw!";
    statusClass = 'status draw';
  } else {
    statusText  = `Turn: ${xIsNext ? 'Player 1 (X)' : 'Player 2 (O)'}`;
    statusClass = 'status turn ' + (xIsNext ? 'x-turn' : 'o-turn');
  }

  return (
    <div className="screen game-screen">
      <button className="back-btn" onClick={onBack}>← Change board</button>

      {/* Scoreboard */}
      <div className="score-row">
        <div className="score-card">
          <span className="score-num x">{scores.X}</span>
          <span className="score-lbl">X wins</span>
        </div>
        <div className="score-card">
          <span className="score-num draw">{scores.D}</span>
          <span className="score-lbl">Draws</span>
        </div>
        <div className="score-card">
          <span className="score-num o">{scores.O}</span>
          <span className="score-lbl">O wins</span>
        </div>
      </div>

      {/* Status */}
      <div className={statusClass}>{statusText}</div>

      {/* Board */}
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, ${cellPx}px)`,
          gap: `${gap}px`,
        }}
      >
        {squares.map((val, i) => {
          const isWinCell = winLine.includes(i);
          let cellClass = 'square';
          if (val === 'X') cellClass += ' x-mark';
          if (val === 'O') cellClass += ' o-mark';
          if (isWinCell)   cellClass += ' win-cell';

          return (
            <button
              key={i}
              className={cellClass}
              style={{ width: cellPx, height: cellPx, fontSize: fontPx }}
              onClick={() => handleClick(i)}
              disabled={!!val || gameOver}
            >
              {val}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="game-actions">
        <button className="btn-sm" onClick={resetRound}>↺ Restart</button>
        <button className="btn-sm primary" onClick={resetRound}>New round</button>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────
// App — screen router
// ───────────────────────────────────────────
const App = () => {
  const [screen, setScreen]     = useState('home');      // 'home' | 'size' | 'game'
  const [boardSize, setBoardSize] = useState(3);
  const [direction, setDirection] = useState('forward'); // for animation class

  const goTo = (next, dir = 'forward') => {
    setDirection(dir);
    setScreen(next);
  };

  const selectSize = (n) => {
    setBoardSize(n);
    goTo('game', 'forward');
  };

  return (
    <div className={`app-wrapper slide-${direction}`}>
      {screen === 'home' && (
        <HomeScreen onStart={() => goTo('size', 'forward')} />
      )}
      {screen === 'size' && (
        <SizeScreen
          onSelect={selectSize}
          onBack={() => goTo('home', 'backward')}
        />
      )}
      {screen === 'game' && (
        <GameScreen
          key={boardSize}
          boardSize={boardSize}
          onBack={() => goTo('size', 'backward')}
        />
      )}
    </div>
  );
};

export default App;