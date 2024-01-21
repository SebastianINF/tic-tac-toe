import { useState } from 'react'
import { Square } from './components/Square'
import { CardWinner } from './components/CardWinner'
import { Marker } from './components/marker'
import { TURNS } from './constants/index'
import { launchConfetti } from './function/confetti'
import {
  saveGameToStorage,
  resetGameStorage,
  saveWinnersToStorage,
  resetWinnersStorage
} from './function/localStorage'
import { checkEndGame, checkWinner } from './function/logic'

export default function App() {
  const [board, setBoard] = useState(() => {
    const boardStorage = localStorage.getItem('board')
    if (boardStorage) return JSON.parse(boardStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnStorage = localStorage.getItem('turn')
    return turnStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(false)
  const [xWins, setXWins] = useState(() => {
    const xWinsStorage = localStorage.getItem('xWins')
    if (xWinsStorage) return parseInt(xWinsStorage)
    return 0
  })
  const [oWins, seOtWins] = useState(() => {
    const oWinsStorage = localStorage.getItem('oWins')
    if (oWinsStorage) return parseInt(oWinsStorage)
    return 0
  })
  const [draw, setDraw] = useState(() => {
    const drawStorage = localStorage.getItem('draw')
    if (drawStorage) return parseInt(drawStorage)
    return 0
  })

  const updateBoard = index => {
    if (winner || board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    if (checkWinner(newBoard, turn)) {
      launchConfetti()
      if (turn === TURNS.X) {
        setXWins(xWins + 1)
        saveWinnersToStorage({
          xWins: xWins + 1,
          oWins,
          draw
        })
      } else if (turn === TURNS.O) {
        seOtWins(oWins + 1)
        saveWinnersToStorage({
          xWins,
          oWins: oWins + 1,
          draw
        })
      }
      setWinner(true)
    } else if (checkEndGame(newBoard, turn)) {
      setDraw(draw + 1)
      setWinner(null)
      saveWinnersToStorage({
        xWins,
        oWins,
        draw: draw + 1
      })
    }
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(false)
    resetGameStorage()
  }

  const resetGame = () => {
    handleReset()
    setXWins(0)
    seOtWins(0)
    setDraw(0)
    resetWinnersStorage()
  }

  return (
    <main className='flex w-full h-full justify-center items-center flex-col text-5xl relative font-cascadia'>
      <h1 className='text-center my-1'>Tic Tac Toe</h1>
      <div className='flex justify-between'>
        <button
          onClick={handleReset}
          className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600  hover:text-black transition-colors'
        >
          🔙
        </button>
        <button
          onClick={resetGame}
          className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600  hover:text-black transition-colors'
        >
          🔄
        </button>
      </div>
      <div className='grid grid-cols-3'>
        {board.map((mark, index) => (
          <Square key={index} updateBoard={updateBoard} index={index}>
            {mark}
          </Square>
        ))}
      </div>
      <section className='flex justify-between'>
        <div className='mr-2'>
          <Marker>{xWins}</Marker>
          <div
            className={`bg-red-600 p-1 m-2 w-[90px] h-[90px] flex justify-center items-center rounded-[3px] ${
              turn === TURNS.X ? 'border-[3px] border-white' : ''
            }`}
          >
            {TURNS.X}
          </div>
        </div>
        <div>
          <Marker>{draw === 0 ? '-' : draw}</Marker>
          <button
            onClick={resetGame}
            className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600 hover:text-black transition-colors'
          >
            .
          </button>
        </div>
        <div className='mr-2 text-center'>
          <Marker>{oWins}</Marker>
          <div
            className={`bg-blue-600 p-1 m-2 w-[90px] h-[90px] flex justify-center items-center rounded-[3px] ${
              turn === TURNS.O ? 'border-[3px] border-white' : ''
            }`}
          >
            {TURNS.O}
          </div>
        </div>
      </section>
      {(winner || winner === null) && (
        <CardWinner winner={winner} turn={turn} resetGame={handleReset} />
      )}
    </main>
  )
}
