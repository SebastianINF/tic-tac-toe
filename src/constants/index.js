import confetti from "canvas-confetti"

export const TURNS = {
  X: '❌️',
  O: '⚪'
}

// Esto son las posiciones ganadoras (index)
export const CASES_WINNER = [
  [0, 1, 2], // 1
  [3, 4, 5], // 2
  [6, 7, 8], // 3
  [0, 3, 6], // 4
  [1, 4, 7], // 5
  [2, 5, 8], // 6
  [0, 4, 8], // 7
  [2, 4, 6] // 8
]

export const launchConfetti = () => {
    var duration = 300
    var end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })

      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
}