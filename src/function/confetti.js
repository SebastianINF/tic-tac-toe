import confetti from 'canvas-confetti'

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
