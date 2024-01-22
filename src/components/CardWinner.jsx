import { TURNS } from '../constants'

export function CardWinner({ winner, turn, resetGame }) {
  if (winner === false) return null

  const winnerText = winner === null ? 'Empate' : 'Ganó:'
  turn = turn === TURNS.X ? TURNS.O : TURNS.X
  if (winner === null) {
    turn = '.'
  }

  return (
    <>
      {(winner || winner === null) && (
        <section className='bg-[#111] border-1 border-white rounded[3px] flex flex-col justify-center items-center gap-[20px] absolute w-[100vw] h-[100vh] top-0 left-0 bg-opacity-100'>
          <div className='bg-[#111] h-[300px] w-[320px] border-1 border-white rounded[3px] flex flex-col justify-center items-center gap[20px] '>
            <h2 className='mb-4'>{winnerText}</h2>

            <header className='mx-auto w-fit bg-opacity-100'>
              {(winner || winner === null) && (
                <button className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600 hover:text-black transition-colors'>
                  {turn}
                </button>
              )}
            </header>

            <footer>
              <button
                onClick={resetGame}
                className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600  hover:text-black transition-colors'
              >
                🔙
              </button>
            </footer>
          </div>
        </section>
      )}
    </>
  )
}
