import { useEffect, useRef, useState } from "react";

interface ImageGalleryProps {
  logo?: string
  imageList?: string[]
}

const ImageGallery = ({logo, imageList}:ImageGalleryProps) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [expandImg, setExpandImg] = useState<boolean>(false);

  const handleExpand = () => {
    setExpandImg(!expandImg)
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
          setExpandImg(false);
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [plusImageIndex, minusImageIndex]);

  return imageList?.length !== 0 && <div className="w-full h-full flex flex-col">
    <div className="flex-1 max-h-[calc(100%-60px)] bg-blue-1 bg-opacity-30 rounded-[10px] flex justify-center items-center p-2.5 min-h-0">
      {selectedIndex !== -1 ? 
      <button onClick={handleExpand} className="w-full h-full">
        <img src={imageList![selectedIndex]} className="w-full h-full object-contain"/>
      </button> :
      <img src={logo} className="max-h-10 max-w-[80%]"/>}
    </div>
    <div className="relative mt-2.5 px-[10%]">
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
              className={`w-[24%] mr-[1%] last:mr-0 flex-shrink-0 scroll-area rounded-[5px] after:pb-[100%] relative after:block overflow-hidden hover:brightness-90 border-2 ${isSelected ? "border-blue-1" : "border-transparent"}`}
              onClick={()=>setSelectedIndex(index)}
            >
              <img src={item} className="w-full h-full object-cover absolute" />
            </button>
          })
        }
      </div>
    </div>
    {expandImg && <div
      className={`fixed w-full h-full top-0 left-0 z-[100] bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center transition-all duration-300`}
    >
      <button onClick={handleExpand}>
        <img src="/images/icons/plus.png" className="w-5 absolute top-8 right-8 rotate-45 dark:invert" />
      </button>
      <button 
        disabled={selectedIndex === 0}
        onClick={minusImageIndex}
        className={`${selectedIndex === 0 && "opacity-30"} transition-opacity duration-300`}
      >
        <img 
          src="/images/icons/right-arrow-2.png" 
          className={`h-7 dark:invert rotate-180`}
        />
      </button>
      <img src={imageList![selectedIndex]} className="w-10/12 h-5/6 object-contain mx-5"/>
      <button 
        disabled={selectedIndex + 1 === imageList!.length}
        onClick={plusImageIndex}
        className={`${selectedIndex + 1 === imageList!.length && "opacity-30"} transition-opacity duration-300`}
      >
        <img 
          src="/images/icons/right-arrow-2.png" 
          className={`h-7 dark:invert`}
        />
      </button>
    </div>}
  </div>
}

export default ImageGallery