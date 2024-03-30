import { fullScreenState } from "@/app/_store/fullScreen";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import FullScreenView from "./FullScreenView";

interface ImageGalleryProps {
  logo?: string
  imageList?: string[]
}

const ImageGallery = ({logo, imageList}:ImageGalleryProps) => {

  const [fullScreen, setFullScreen] = useRecoilState(fullScreenState)

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleExpand = () => {
    setFullScreen(prev => ({
      ...prev,
      open: !prev.open,
    }))
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsLeftDisabled(scrollLeft <= 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons, { passive: true });
    }

    checkScrollButtons();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  const scrollImages = (direction:string) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth;

      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const plusImageIndex = () => {
    if (selectedIndex + 1 < imageList!.length) {
      setSelectedIndex(prev => prev + 1)
    }
  }

  const minusImageIndex = () => {
    if (selectedIndex - 1 >= 0) {
      setSelectedIndex(prev => prev - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      switch(event.key) {
        case "ArrowRight":
          plusImageIndex();
          break;
        case "ArrowLeft":
          minusImageIndex();
          break;
        case "Escape":
          setFullScreen(prev => ({
            ...prev,
            open: false,
          }))
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [plusImageIndex, minusImageIndex]);


  useEffect(()=>{
    setFullScreen(prev => ({
      ...prev,
      component: () => {
      return <FullScreenView
        handleExpand={handleExpand}
        minusImageIndex={minusImageIndex}
        plusImageIndex={plusImageIndex}
        imageList={imageList}
        selectedIndex={selectedIndex}
      />},
    }))
  }, [imageList, selectedIndex])

  return <div className="w-full h-full flex flex-col">
    <div className="flex-1 bg-blue-1 bg-opacity-30 rounded-[10px] flex justify-center items-center p-2.5 min-h-0">
      {selectedIndex !== -1 ? 
      <button onClick={handleExpand} className="w-full h-full">
        <img src={imageList![selectedIndex]} className="w-full h-full object-contain"/>
      </button> :
      <img src={logo} className="max-h-[20%] max-w-[80%]"/>}
    </div>
    {imageList?.length !== 0 && <div className="relative mt-2.5 px-[10%]">
      {imageList!.length > 4 && <>
        <button 
          className={`absolute -translate-y-1/2 top-[50%] left-0 transition-opacity duration-300 ${isLeftDisabled && "opacity-30"}`}
          disabled={isLeftDisabled}
          onClick={()=>scrollImages('left')}
        >
          <img 
            src="/images/icons/right-arrow-2.png" 
            className={`h-5 dark:invert rotate-180`}
          />
        </button>
        <button 
          className={`absolute -translate-y-1/2 top-[50%] right-0 transition-opacity duration-300 ${isRightDisabled && "opacity-30"}`}
          disabled={isRightDisabled}
          onClick={()=>scrollImages('right')}
        >
          <img 
            src="/images/icons/right-arrow-2.png" 
            className={`h-5 dark:invert`}
          />
        </button>
      </>}
      <div 
        ref={scrollContainerRef} 
        className={`relative flex ${imageList!.length < 4 && "justify-center"} scroll-container-x hide-scroll-bar`}
      >
        {
          imageList!.map((item, index) => {
            const isSelected = (imageList![selectedIndex] === item)
            return <button 
              key={`img-preview-${index}`} 
              className={`w-[24%] mr-[1%] last:mr-0 flex-shrink-0 scroll-area rounded-[5px] after:pb-[100%] relative after:block overflow-hidden hover:brightness-90 transition-all border-2 ${isSelected ? "border-blue-1" : "border-transparent"}`}
              onClick={()=>setSelectedIndex(index)}
            >
              <img src={item} className="w-full h-full object-cover absolute" />
            </button>
          })
        }
      </div>
    </div>}
  </div>
}

export default ImageGallery