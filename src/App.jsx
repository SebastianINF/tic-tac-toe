import { useState } from 'react'
import { Square } from './components/Square'
import { CardWinner } from './components/CardWinner'
import { TURNS, launchConfetti } from './constants/index'
import { saveGameToStorage, resetGameStorage } from './function/localStorage'
import { checkEndGame, checkWinner } from './function/logic'

export default function App() {
  const [board, setBoard] = useState(() => {
    const localBoard = localStorage.getItem('board')
    if (localBoard) return JSON.parse(localBoard)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const localTurn = localStorage.getItem('turn')
    return localTurn ?? TURNS.X  
  })
  const [winner, setWinner] = useState(false)

  const updateBoard = index => {
    // si ya hay un ganador se para el encuentro
    if (winner || board[index]) return

    // Update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Update Turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    if (checkWinner(newBoard, turn)) {
      launchConfetti()
      setWinner(true)
    } else if (checkEndGame(newBoard, turn)) {
      setWinner(null)
    }
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(false)
    resetGameStorage()
  }

  return (
    <main className='flex w-full h-full justify-center items-center flex-col text-5xl relative'>
      <h1 className='text-center my-1'>Tic Tac Toe</h1>
      <button
        onClick={handleReset}
        className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600  hover:text-black transition-colors'
      >
        🔙
      </button>
      <div className='grid grid-cols-3'>
        {board.map((mark, index) => (
          <Square key={index} updateBoard={updateBoard} index={index}>
            {mark}
          </Square>
        ))}
      </div>
      {/* <!-- Turnos -> */}
      <section className='flex justify-between'>
        <div
          className={`bg-red-600 p-1 m-2 w-[90px] h-[90px] flex justify-center items-center rounded-[3px] ${
            turn === TURNS.X ? 'border-[3px] border-white' : ''
          }`}
        >
          {TURNS.X}
        </div>
        <div
          className={`bg-blue-600 p-1 m-2 w-[90px] h-[90px] flex justify-center items-center rounded-[3px] ${
            turn === TURNS.O ? 'border-[3px] border-white' : ''
          }`}
        >
          {TURNS.O}
        </div>
      </section>
      {(winner || winner === null) && (
        <CardWinner winner={winner} turn={turn} resetGame={handleReset} />
      )}
    </main>
  )
}
