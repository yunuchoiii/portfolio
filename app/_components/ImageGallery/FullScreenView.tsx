"use client"

import { useMediaQuery } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import Tooltip from "../Tooltip/Tooltip"

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
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <div
    className={`absolute w-screen h-dvh top-0 left-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg flex sm:flex-col items-center justify-center sm:gap-5`}
  >
    <button title="닫기" onClick={handleExpand} className="absolute top-5 right-5 p-2.5">
      <img src="/images/icons/plus.png" className="w-5 rotate-45 dark:invert"/>
    </button>
    <button
      title="이전 이미지"
      disabled={selectedIndex === 0}
      onClick={minusImageIndex}
      className={`sm:hidden ${selectedIndex === 0 ? "opacity-30" : ""} transition-opacity duration-300 p-2.5`}
    >
      <i className="fa-solid fa-chevron-left text-xl"></i>
    </button>
    <div className="relative sm:w-10/12 w-[calc(100vw-80px)] h-3/4 overflow-y-auto">
      <img src={imageList![selectedIndex]} className={`w-full object-contain ${isExpanded ? "" : "h-full"}`}/>
    </div>
    <button 
      title="다음 이미지"
      disabled={selectedIndex + 1 === imageList!.length}
      onClick={plusImageIndex}
      className={`sm:hidden ${selectedIndex + 1 === imageList!.length ? "opacity-30" : ""} transition-opacity duration-300 p-2.5`}
    >
      <i className="fa-solid fa-chevron-right text-xl"></i>
    </button>
    <div className="sm:flex hidden items-center justify-center rounded-full bg-blue-1 dark:bg-blue-4 bg-opacity-25 dark:bg-opacity-30 backdrop-blur-lg py-1.5 px-3">
      <Tooltip title="이전 이미지" position="top">
        <button
          disabled={selectedIndex === 0}
          onClick={minusImageIndex}
          className={`${selectedIndex === 0 ? "opacity-30" : ""} transition-opacity duration-300 p-2.5`}
        >
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </button>
      </Tooltip>
      {!isMobile && (
        <Tooltip title={isExpanded ? "축소" : "확대"} position="top">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2.5`}
          >
            <i className={`fa-solid ${isExpanded ? "fa-compress-alt" : "fa-expand-alt"} text-xl`}></i>
          </button>
        </Tooltip>
      )}
      <Tooltip title="다음 이미지" position="top">
        <button 
          disabled={selectedIndex + 1 === imageList!.length}
          onClick={plusImageIndex}
          className={`${selectedIndex + 1 === imageList!.length ? "opacity-30" : ""} transition-opacity duration-300 p-2.5`}
        >
          <i className="fa-solid fa-chevron-right text-xl"></i>
        </button>
      </Tooltip>
    </div>
  </div>
}

export default FullScreenView