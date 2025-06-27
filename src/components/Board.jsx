import React, { useState } from 'react'
import Square from './Square'

const Board = ({ xIsNext, squares, onPlay }) => {
  function calculateWinner(squares) {
    if (!squares) {
      return null
    }

    // Define all possible winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          line: [a, b, c],
        }
      }
    }
    return null
  }

  // Function to handle square click
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    // Create a copy of the squares array
    // and update the square at index i
    const nextSquares = squares.slice()
    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O')

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  const winningLine = winner && winner.line

  let status
  if (winner) {
    status = `Winner: ${winner.winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  if (!winner) {
    // Check for a draw
    // If all squares are filled and no winner, it's a draw
    const isDraw = squares.every(square => square !== null)
    if (isDraw) {
      status = 'Draw!'
    }
  }

  function renderSquares() {
    return squares.map((value, index) => (
      <Square
        key={index}
        value={value}
        isWinning={winningLine && winningLine.includes(index)}
        onSquareClick={() => handleClick(index)}
      />
    ))
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: 3 }, (_, i) => (
        <div className="board-row" key={i}>
          {renderSquares().slice(i * 3, i * 3 + 3)}
        </div>
      ))}
    </>
  )
}

export default Board
