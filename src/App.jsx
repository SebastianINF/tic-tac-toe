import { useState } from 'react'
import { Square } from './components/Square'
import { CardWinner } from './components/CardWinner'
import { OffSpeaker, OnSpeaker } from './components/SvgSpeaker'
import { Board } from './components/Board'
import { Marker } from './components/marker'
import { TURNS } from './constants/index'
import { launchConfetti } from './function/confetti'
import { playAudio } from './function/playAudio'
import {
  saveGameToStorage,
  resetGameStorage,
  saveWinnersToStorage,
  resetWinnersStorage
} from './function/localStorage'
import { checkEndGame, checkWinner } from './function/logic'

export default function App() {
  // Las variables de estado de mi aplicación
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
  const [audio, setAudio] = useState(() => {
    const audioStorage = localStorage.getItem('audio')
    if (!audioStorage) return true
    if (audioStorage === 'false') return false
    if (audioStorage === 'true') return true
  })

  const updateBoard = index => {
    if (winner || board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    playAudio(turn, audio)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    if (checkWinner(newBoard, turn)) {
      launchConfetti()
      playAudio('game-over', audio)
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
      playAudio('draw', audio)
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

  const toggleAudio = () => {
    setAudio(!audio)
    window.localStorage.setItem('audio', (!audio).toString())
  }

  return (
    <main className='flex w-full h-full justify-center items-center flex-col text-5xl relative font-sans'>
      <div className='flex justify-between'>
        <Square onClick={handleReset}>🔙</Square>
        <Square onClick={toggleAudio}>
          {audio ? <OnSpeaker /> : <OffSpeaker />}
        </Square>
      </div>
      <Board updateBoard={updateBoard} board={board} />
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
          <Square onClick={resetGame}>🔄</Square>
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
      <CardWinner winner={winner} turn={turn} resetGame={handleReset} />
    </main>
  )
}
