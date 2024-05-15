'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { IProject } from "@/app/_types/project";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Dispatch, SetStateAction } from "react";
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

  const projectList:IProject[] = (data as IProject[]).sort((a,b) => a.id - b.id).filter(i => i.show_yn !== false)

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <>
    <div 
      ref={ref} 
      className={`relative w-full h-full flex items-center justify-center 2xl:mt-0 -mt-5 ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}`}
    >
      <div className={`absolute sm:hidden block -top-[65px] right-0 ${selectedProjectId != -1 ? "fade-in" : "fade-out"}`}>
        <IconButton onClick={() => {setSelectedProjectId(-1)}}>
          <i className="fa-solid fa-arrow-left text-2xl invert-0 dark:invert"></i>
        </IconButton>
      </div>
      <div 
        className="w-full flex overflow-y-hidden scroll-container-x hide-scroll-bar"
        style={{overflowX: selectedProjectId !== -1 ? "hidden" : "auto"}}
      >
        {(projectList as IProject[]).map(item => {
          const isSelected = selectedProjectId === item.id;
          return <div 
            key={`project-item-${item.id}`}
            className={`project-button relative ${isSelected ? "w-full" : (selectedProjectId == -1 ? "lg:w-1/6 sm:w-1/4 w-1/2" : "w-0")} 2xl:h-[588px] xl:h-[488px] lg:h-[388px] md:h-[436px] sm:h-[400px] h-[calc((50vw-30px)*2.8)] flex-shrink-0 flex justify-center scroll-area transition-all duration-1000`}
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