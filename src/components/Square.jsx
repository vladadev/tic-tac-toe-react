import React, { useState } from 'react'

const Square = ({ value, isWinning, onSquareClick }) => {
  return (
    <button
      className={`square${isWinning ? ' glow' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

export default Square
