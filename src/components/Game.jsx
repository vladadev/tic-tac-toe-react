import React, { useState } from 'react'
import Board from './Board'

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpToMove(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((_, move) => {
    const isCurrentMove = move === currentMove
    const desc = move ? `Go to move #${move}` : 'Go to game start'

    return (
      <li key={move}>
        {isCurrentMove ? (
          <span className="current-move">{`You are at the move #${move}`}</span>
        ) : (
          <button onClick={() => jumpToMove(move)}>{desc}</button>
        )}
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game
