interface FullScreenViewProps {
  handleExpand: () => void
  minusImageIndex: () => void
  plusImageIndex: () => void
  imageList: string[] | undefined
  selectedIndex: number
}

const FullScreenView = ({ 
  handleExpand, 
  minusImageIndex,
  plusImageIndex, 
  imageList, 
  selectedIndex 
}:FullScreenViewProps) => {

  return <div
    className={`absolute w-screen h-dvh top-0 left-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg flex items-center justify-center`}
  >
    <button onClick={handleExpand}>
      <img src="/images/icons/plus.png" className="w-5 absolute top-8 right-8 rotate-45 dark:invert" />
    </button>
    <button
      disabled={selectedIndex === 0}
      onClick={minusImageIndex}
      className={`${selectedIndex === 0 ? "opacity-30" : ""} 
      transition-opacity duration-300  p-5`}
    >
      <i className="fa-solid fa-chevron-left text-2xl"></i>
    </button>
    <img src={imageList![selectedIndex]} className="sm:w-10/12 w-[calc(100vw-150px)] h-5/6 object-contain mx-5"/>
    <button 
      disabled={selectedIndex + 1 === imageList!.length}
      onClick={plusImageIndex}
      className={`${selectedIndex + 1 === imageList!.length ? "opacity-30" : ""} transition-opacity duration-300 p-5`}
    >
      <i className="fa-solid fa-chevron-right text-2xl"></i>
    </button>
  </div>
}

export default FullScreenView