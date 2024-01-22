import { TURNS } from '../constants'
import { Square } from './Square'

export function CardWinner({ winner, turn, resetGame }) {
  if (winner === false) return null

  const winnerText = winner === null ? 'Draw' : 'Winner'
  turn = turn === TURNS.X ? TURNS.O : TURNS.X
  if (winner === null) {
    turn = '.'
  }

  return (
    <>
      {(winner || winner === null) && (
        <section className='bg-violet-700 border-1 border-white rounded[3px] flex flex-col justify-center items-center gap-[20px] absolute w-[100vw] h-[100vh] top-0 left-0 bg-opacity-100'>
          <div className='bg-violet-800 h-[300px] w-[320px] border-1 border-white rounded[3px] flex flex-col justify-center items-center gap[20px]'>
            <h2 className='mb-4'>{winnerText}</h2>

            <header className='mx-auto w-fit bg-opacity-100'>
              {(winner || winner === null) && (
                <Square onClick={() => {}}>{turn}</Square>
              )}
            </header>

            <footer>
              <Square onClick={resetGame}>🔙</Square>
            </footer>
          </div>
        </section>
      )}
    </>
  )
}
