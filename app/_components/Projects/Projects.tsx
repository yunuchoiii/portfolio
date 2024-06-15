'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { isMobileStateAtom } from "@/app/_store/isMobile";
import { IProject } from "@/app/_types/project";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import IconButton from "../Button/IconButton";
import ProjectButton from "./ProjectButton";
import ProjectDetail from "./ProjectDetail";

interface ProjectsProps {
  selectedProjectId: number;
  setSelectedProjectId: Dispatch<SetStateAction<number>>
  isProjectAnimating:boolean
  handleProjectButton: (id: number) => void
}

const Projects = ({
  selectedProjectId,
  setSelectedProjectId,
  isProjectAnimating,
  handleProjectButton
}:ProjectsProps) => {
  const { data } = useFirestore('project');
  const isMobile = useRecoilValue(isMobileStateAtom)

  const projectList:IProject[] = (data as IProject[]).sort((a,b) => a.id - b.id).filter(i => i.show_yn !== false)

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsScrolledToLeft(scrollLeft === 0);
        setIsScrolledToRight(scrollLeft + clientWidth >= scrollWidth-10);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollProjects = (direction:"left"|"right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth;

      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  return <>
    <div 
      ref={ref} 
      className={`relative w-full h-full flex items-center justify-center 2xl:mt-0 -mt-5 ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}`}
    >
      <div className={`absolute -left-16 ${isMobile && "hidden"}`}>
        <IconButton 
          onClick={()=>scrollProjects("left")} 
          props={{
            className: `${isScrolledToLeft ? "opacity-0" : ""} transition-opacity`
          }}
        >
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </IconButton>
      </div>
      <div className={`absolute -right-16 ${isMobile && "hidden"}`}>
        <IconButton 
          onClick={()=>scrollProjects("right")} 
          props={{
            className: `${isScrolledToRight ? "opacity-0" : ""} transition-opacity`
          }}
        >
          <i className="fa-solid fa-chevron-right text-lg"></i>
        </IconButton>
      </div>
      <div className={`absolute sm:hidden block -top-[65px] right-0 ${selectedProjectId != -1 ? "fade-in" : "fade-out"}`}>
        <IconButton onClick={() => {setSelectedProjectId(-1)}}>
          <i className="fa-solid fa-arrow-left text-2xl invert-0 dark:invert"></i>
        </IconButton>
      </div>
      <div
        ref={scrollContainerRef}
        className="w-full flex overflow-y-hidden scroll-container-x hide-scroll-bar"
        style={{overflowX: selectedProjectId !== -1 ? "hidden" : "auto"}}
      >
        {(projectList as IProject[]).map(item => {
          const isSelected = selectedProjectId === item.id;
          return <div 
            key={`project-item-${item.id}`}
            className={`project-button relative ${isSelected ? "w-full" : (selectedProjectId == -1 ? "xl:w-1/6 lg:w-1/5 sm:w-1/4 w-1/2" : "w-0")} 2xl:h-[588px] xl:h-[488px] lg:h-[468px] md:h-[436px] sm:h-[400px] h-[calc((50vw-30px)*2.8)] flex-shrink-0 flex justify-center scroll-area transition-all duration-1000`}
          >
            <ProjectButton 
              item={item}
              isSelected={isSelected} 
              selectedProjectId={selectedProjectId}
              onClick={()=>handleProjectButton(item.id)}
            />
            <ProjectDetail
              item={item}
              setSelectedProjectId={setSelectedProjectId}
              show={isSelected && !isProjectAnimating}
            />
          </div>
        })}
      </div>
    </div>
  </>
}

export default Projects;