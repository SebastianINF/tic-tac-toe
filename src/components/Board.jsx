import { Square } from "./Square"

export function Board({ board, updateBoard }) {
  return (
    <div className='grid grid-cols-3'>
      {board.map((boardElement, index) => (
        <Square key={index} onClick={() => updateBoard(index)}>
          {boardElement}
        </Square>
      ))}
    </div>
  )
}
