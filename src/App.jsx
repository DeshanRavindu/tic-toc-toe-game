import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>{value}</button>
);


const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

 const winner = calculateWinner(squares);
  const winnerDisplay = winner === 'X' ? 'Player 1' : winner === 'O' ? 'Player 2' : null;
  
  // Check if game is a draw (all squares filled but no winner)
  const isDraw = !winner && squares.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `Winner: ${winnerDisplay}`;
  } else if (isDraw) {
    status = 'Match has draw';
  } else {
    status = `Next player: ${xIsNext ? 'Player 1' : 'Player 2'}`;
  }

  return (
     <div className="board-container">
      <h1 className='head'>Tic Toc Toe Game</h1>
      <h4>XOX</h4>
      <h2>{status}</h2>
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button className="reset-button" onClick={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}>Reset Game</button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const App = () => <Board />;

export default App;
