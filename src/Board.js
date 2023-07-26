import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Square from './Square';
import './Board.css'

const Board = forwardRef(({ isComputerPlaying, onGameCompletion }, ref) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const initialize = () =>{
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Expose the initialize method via ref
  useImperativeHandle(ref, () => ({
    initialize: initialize
  }));

  const handleClick = (index) => {
    if (calculateWinner(squares).winner || squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    const isWinningSquare = combo && combo.includes(index);
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        isWinning={isWinningSquare}
      />
    );
  };

  const { winner, combo } = calculateWinner(squares);
  const areAllSquaresFilled = (squares) => {
    return squares.every((square) => square !== null);
  };
  const filledAllSquares = areAllSquaresFilled(squares);
  useEffect(() => {
    if (winner || filledAllSquares) {
        onGameCompletion();
    }
  }, [winner, onGameCompletion, filledAllSquares]);
  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  if(filledAllSquares && winner == null){
    status = 'Match Drawn';
  }
  const mode = isComputerPlaying ? 'Playing with Computer' : 'Playing with another player';

  return (
    <div>
      <div className="mode">{mode}</div>
      <div className="status">{status}</div>
    <div className="board-table">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
    </div>
  );
});

const calculateWinner = (squares) => {
    // All possible winning combinations
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return { winner: squares[a], combo };
        }
      }
    
      return { winner: null, combo: null };
  };
  

export default Board;
