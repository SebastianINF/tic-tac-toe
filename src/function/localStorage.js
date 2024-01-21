export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const saveWinnersToStorage = ({ xWins, oWins, draw }) => {
  window.localStorage.setItem('xWins', xWins.toString())
  window.localStorage.setItem('oWins', oWins.toString())
  window.localStorage.setItem('draw', draw.toString() )
}

export const resetWinnersStorage = () => {
  window.localStorage.removeItem('xWins')
  window.localStorage.removeItem('oWins')
  window.localStorage.removeItem('draw')
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
