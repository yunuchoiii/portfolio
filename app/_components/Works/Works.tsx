'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { IProject } from "@/app/_types/project";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import WorkButton from "./WorkButton";
import WorkDetail from "./WorkDetail";

interface WorksProps {
  selectedWorkId: number;
  setSelectedWorkId: Dispatch<SetStateAction<number>>
  isWorkAnimating:boolean
  handleWorkButton: (id: number) => void
}

const Works = ({
  selectedWorkId,
  setSelectedWorkId,
  isWorkAnimating,
  handleWorkButton
}:WorksProps) => {
  const { data } = useFirestore('project');

  const projectList:IProject[] = (data as IProject[]).sort((a,b) => a.id - b.id).filter(i => i.show_yn !== false)

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkArrows = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < maxScrollLeft);
    };

    checkArrows(); // 초기 로드 시 체크
    // 스크롤 이벤트 리스너 등록
    scrollContainerRef.current?.addEventListener('scroll', checkArrows);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', checkArrows);
    };
  }, []);

  return <>
    <div className="relative w-full h-full flex items-center justify-center 2xl:mt-0 -mt-5">
      <div 
        ref={scrollContainerRef}
        className="w-full flex overflow-y-hidden scroll-container-x hide-scroll-bar"
        style={{overflowX: selectedWorkId !== -1 ? "hidden" : "auto"}}
      >
        {(projectList as IProject[]).map(item => {
          const isSelected = selectedWorkId === item.id;
          return <div 
            key={`project-item-${item.id}`}
            className={`project-button relative ${isSelected ? "w-full" : (selectedWorkId == -1 ? "lg:w-1/6 sm:w-1/4 w-1/2" : "w-0")} 2xl:h-[588px] xl:h-[488px] lg:h-[388px] md:h-[436px] sm:h-[400px] h-[calc((50vw-30px)*2.8)] flex-shrink-0 flex justify-center scroll-area transition-all duration-1000`}
          >
            <WorkButton 
              item={item} 
              isSelected={isSelected} 
              selectedWorkId={selectedWorkId}
              onClick={()=>handleWorkButton(item.id)}
            />
            <WorkDetail
              item={item}
              setSelectedWorkId={setSelectedWorkId}
              show={isSelected && !isWorkAnimating}
            />
          </div>
        })}
      </div>
      {/* TODO: 잘 안됨 (특히 오른쪽) */}
      {/* <div className="opacity-30">
        <img src="/images/icons/right-arrow-2.png" className={`w-10 absolute -left-16 dark:invert -mt-7 rotate-180 transition-opacity duration-500 ${!showLeftArrow && "opacity-0"}`}/>
        <img src="/images/icons/right-arrow-2.png" className={`w-10 absolute -right-16 dark:invert -mt-7 transition-opacity duration-500 ${!showRightArrow && "opacity-0"}`}/>
      </div> */}
    </div>
  </>
}

export default Works;