'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { IProject } from "@/app/_types/project";
import { Dispatch, SetStateAction } from "react";
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

  return <>
    <div className="relative w-full h-full flex items-center justify-center 2xl:mt-0 -mt-5">
      <div 
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
    </div>
  </>
}

export default Works;