import { IProject } from "@/app/_types/project"
import { Dispatch, SetStateAction } from "react"
import IconButton from "../Button/IconButton"
import ImageGallery from "../ImageGallery/ImageGallery"

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
    <div className="w-full h-full 2xl:p-[3vw] p-[4vw] flex">
      <div className="lg:w-2/5 sm:w-1/2 h-full">
        <ImageGallery 
          logo={item.logo_img} 
          imageList={item.img_list}
        />
      </div>
      <div className="sm:w-3/5 h-full"></div>
    </div>
  </div>
}

export default WorkDetail