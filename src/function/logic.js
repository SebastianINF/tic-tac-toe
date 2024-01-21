import { CASES_WINNER } from '../constants'

export const checkWinner = (newBoard, turn) => {
  let win = false
  CASES_WINNER.forEach(posiciones => {
    const [a, b, c] = posiciones

    if (
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c] &&
      newBoard[b] === newBoard[c] &&
      newBoard[a] === turn
    )
      win = true
  })
  return win
}

export const checkEndGame = newBoard => {
  return newBoard.every(value => value !== null)
}
