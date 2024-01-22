export function Square({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className='p-3 m-2 rounded-[3px] border-white border w-[90px] h-[90px] flex justify-center items-center flex-col flex-nowrap hover:bg-violet-600 text-white transition-color'
    >
      {children}
    </button>
  )
}