import { IProject } from "@/app/_types/project"
import { Dispatch, SetStateAction } from "react"
import IconButton from "../Button/IconButton"

interface WorkDetailProps {
  item: IProject
  setSelectedWorkId: Dispatch<SetStateAction<number>>
  show: boolean
}

const WorkDetail = ({item, setSelectedWorkId, show}:WorkDetailProps) => {

  const handleBack = () => {
    setSelectedWorkId(-1)
  }

  return <div className={`absolute w-full h-full bg-blue-1 bg-opacity-15 transition-all duration-500 ${show ? "fade-in" : "fade-out"}`}>
    <div className="absolute top-10 right-10 dark:invert">
      <IconButton onClick={handleBack}>
        <img src="/images/icons/right-arrow.png" className="w-7 rotate-180"/>
      </IconButton>
    </div>
    <div className="w-full h-full py-[70px] px-[60px]">
      
    </div>
  </div>
}

export default WorkDetail