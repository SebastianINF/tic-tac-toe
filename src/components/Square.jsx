export function Square({ children, updateBoard, index }) {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <button
      onClick={handleClick}
      className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-slate-600 hover:text-black transition-colors'
    >
      {children}
    </button>
  )
}