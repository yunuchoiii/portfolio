import { fullScreenState } from "@/app/_store/fullScreen";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import FullScreenView from "./FullScreenView";

interface ImageGalleryProps {
  logo?: string
  imageList?: string[]
}

const ImageGallery = ({logo, imageList}:ImageGalleryProps) => {

  const setFullScreen = useSetRecoilState(fullScreenState)

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

  return <article className="w-full h-full flex flex-col">
    <section className="flex-1 bg-blue-1 bg-opacity-25 rounded-[10px] flex justify-center items-center p-2.5 min-h-0">
      {selectedIndex !== -1 ? 
      <button 
        title="전체 화면"
        onClick={handleExpand} 
        className="relative w-full h-full"
      >
        <Image 
          src={imageList![selectedIndex]} 
          alt={`main-image-${selectedIndex}`}
          fill
          className="object-contain"
          quality={85}
          priority={true}
        />
      </button> :
      <Image 
        src={logo || ''} 
        alt="logo"
        width={300}
        height={200}
        className="max-h-[20%] max-w-[80%] object-contain"
      />}
    </section>
    {imageList?.length !== 0 && 
    <section className="relative mt-2.5 px-[10%]">
      {imageList!.length > 4 && <>
        <button 
          title="이전 스크롤"
          className={`absolute -translate-y-1/2 top-[50%] left-0 transition-opacity duration-300 p-2 ${isLeftDisabled ? "opacity-30" : ""}`}
          disabled={isLeftDisabled}
          onClick={()=>scrollImages('left')}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button 
          title="다음 스크롤"
          className={`absolute -translate-y-1/2 top-[50%] right-0 transition-opacity duration-300 p-2 ${isRightDisabled ? "opacity-30" : ""}`}
          disabled={isRightDisabled}
          onClick={()=>scrollImages('right')}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </>}
      <div 
        ref={scrollContainerRef} 
        className={`relative flex ${imageList!.length < 4 ? "justify-center" : ""} scroll-container-x hide-scroll-bar`}
      >
        {
          imageList!.map((item, index) => {
            const isSelected = (imageList![selectedIndex] === item)
            return <button 
              key={`img-preview-${index}`} 
              title={`이미지 보기`}
              className={`w-[24%] mr-[1%] last:mr-0 flex-shrink-0 scroll-area rounded-[5px] after:pb-[100%] relative after:block overflow-hidden hover:brightness-90 transition-all border-2 ${isSelected ? "border-blue-1" : "border-transparent"}`}
              onClick={()=>setSelectedIndex(index)}
            >
              <Image 
                src={item} 
                alt={`image-${index}`} 
                fill 
                className="object-cover absolute" 
                loading="lazy"
                quality={60}
                sizes="(max-width: 768px) 25vw, 20vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j..."
              />
            </button>
          })
        }
      </div>
    </section>}
  </article>
}

export default ImageGallery