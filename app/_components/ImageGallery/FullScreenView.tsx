import Image from "next/image"

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
    <button 
      title="전체 화면 닫기"
      onClick={handleExpand}
    >
      <img src="/images/icons/plus.png" className="w-5 absolute top-8 right-8 rotate-45 dark:invert" />
    </button>
    <button
      title="이전 이미지"
      disabled={selectedIndex === 0}
      onClick={minusImageIndex}
      className={`${selectedIndex === 0 ? "opacity-30" : ""} 
      transition-opacity duration-300  p-5`}
    >
      <i className="fa-solid fa-chevron-left text-2xl"></i>
    </button>
    <div className="relative sm:w-10/12 w-[calc(100vw-150px)] h-5/6">
      <Image 
        src={imageList![selectedIndex]} 
        alt={`image-${selectedIndex}`} 
        fill 
        className="object-contain mx-5"
      />
    </div>
    <button 
      title="다음 이미지"
      disabled={selectedIndex + 1 === imageList!.length}
      onClick={plusImageIndex}
      className={`${selectedIndex + 1 === imageList!.length ? "opacity-30" : ""} transition-opacity duration-300 p-5`}
    >
      <i className="fa-solid fa-chevron-right text-2xl"></i>
    </button>
  </div>
}

export default FullScreenView