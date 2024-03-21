'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { IProject } from "@/app/_types/project";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import WorkButton from "./WorkButton";
import WorkDetail from "./WorkDetail";

interface WorksProps {
  selectedWorkId: number;
  setSelectedWorkId: Dispatch<SetStateAction<number>>
}

const Works = ({
  selectedWorkId,
  setSelectedWorkId,
}:WorksProps) => {
  const { data } = useFirestore('project');

  const projectList:IProject[] = (data as IProject[]).sort((a,b) => a.id - b.id).filter(i => i.show_yn !== false)

  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const handleWorkButton = (id:number) => {
    setSelectedWorkId(id)
    setIsAnimating(true)

    setTimeout(()=>{
      setIsAnimating(false)
    }, 500)
  }

  useEffect(()=>{console.log(selectedWorkId)}, [selectedWorkId])

  return <>
    <div className="w-full h-full flex items-center justify-center 2xl:mt-0 -mt-5">
      <div className="w-full flex overflow-x-scroll overflow-y-hidden scroll-container-x hide-scroll-bar">
        {(projectList as IProject[]).map(item => {
          const isSelected = selectedWorkId === item.id;
          return <div 
            key={`project-item-${item.id}`}
            className={`project-button relative ${isSelected ? "w-full" : (selectedWorkId == -1 ? "lg:w-1/6 md:w-1/5 sm:w-1/4 w-1/2" : "w-0")} 2xl:h-[588px] xl:h-[488px] lg:h-[388px] md:h-[376px] sm:h-[400px] h-[500px] flex-shrink-0 flex justify-center scroll-area transition-all duration-1000`}
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
              show={isSelected && !isAnimating}
            />
          </div>
        })}
      </div>
    </div>
  </>
}

export default Works;