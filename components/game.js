import s from '../styles/game.module.css'
import Board from './board'
import { useState } from 'react'

const Game = props => {
  const initSquares = Array(9).fill(null)
  const [history, setHistory] = useState([initSquares])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const status = squares => {
    const winner = calculateWinner(squares)
    if (winner) {
      return 'Winner: ' + winner
    } else if (squares.reduce((x, y) => x && y)) {
      return 'Draw'
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current)

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1)
    const squares = current.slice()
    if (winner || squares[i]) return
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory([...slicedHistory, squares])
    setXIsNext(!xIsNext)
    setStepNumber(slicedHistory.length)
  }

  const jumpTo = step => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className={s.game}>
      <div className='game-board'>
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className={s.gameinfo}>
        <div>{status(current)}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game
