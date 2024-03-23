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

  return <div className={`absolute w-full h-full bg-blue-1 bg-opacity-30 ${show ? "fade-in" : "fade-out"}`}>
    <div className="absolute top-[2vw] right-[2vw] dark:invert-0">
      <IconButton onClick={handleBack}>
        <img src="/images/icons/right-arrow.png" className="w-7 rotate-180"/>
      </IconButton>
    </div>
    <div className="w-full h-full py-[8vh] px-[5vw] flex flex-col">
      <div className="text-xl Montserrat">
        {item.kor_name || item.eng_name}
      </div>
      <div className="flex-1"></div>
    </div>
  </div>
}

export default WorkDetail