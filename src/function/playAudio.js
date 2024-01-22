import { TURNS } from '../constants'

export function playAudio(option, audio) {
  if (!audio) return
  if (option === TURNS.X) new Audio('/audio/note-high.mp3').play()
  if (option === TURNS.O) new Audio('/audio/note-low.mp3').play()
  if (option === 'draw') new Audio('/audio/game-over-draw.mp3').play()
  if (option === 'game-over') new Audio('/audio/game-over.mp3').play()
}
