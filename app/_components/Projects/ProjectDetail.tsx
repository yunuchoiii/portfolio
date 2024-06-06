import useFirestore from "@/app/_hooks/useFirestore"
import { IProject } from "@/app/_types/project"
import { ISkill } from "@/app/_types/skills"
import { Dispatch, SetStateAction } from "react"
import IconButton from "../Button/IconButton"
import ImageGallery from "../ImageGallery/ImageGallery"
import ProjectDetailSection from "./ProjectDetailSection"

interface ProjectDetailProps {
  item: IProject
  setSelectedProjectId: Dispatch<SetStateAction<number>>
  show: boolean
}

const ProjectDetail = ({item, setSelectedProjectId, show}:ProjectDetailProps) => {

  const { data: skillList } = useFirestore('skill');

  const usedSkills = (skillList as ISkill[])
    .filter(s => item.skill_id_list.includes(s.id))
    .sort((a,b) => a.id - b.id)
  
  const handleBack = () => {
    setSelectedProjectId(-1)
  }  

  return <div className={`absolute w-full h-full bg-blue-1 bg-opacity-20 dark:bg-opacity-25 overflow-y-scroll hide-scroll-bar ${show ? "fade-in" : "fade-out"}`}>
    <div className="absolute sm:block hidden top-[2vw] right-[2vw]">
      <IconButton onClick={handleBack}>
        <i className="fa-solid fa-arrow-left text-2xl invert-0 dark:invert"></i>
      </IconButton>
    </div>
    <div className="w-full h-full 2xl:p-[3vw] p-[4vw] flex sm:flex-row flex-col">
      <div className="lg:w-2/5 sm:w-1/2 sm:h-full h-[300px] flex-shrink-0">
        <ImageGallery 
          logo={item.logo_img}
          imageList={item.img_list}
        />
      </div>
      <div className="h-full w-[1px] bg-[#333] dark:bg-white bg-opacity-30 dark:bg-opacity-30 mx-10 sm:block hidden"></div>
      <div className="sm:flex-1 sm:h-full flex-shrink-0 overflow-y-scroll hide-scroll-bar scroll-smooth sm:mt-0 mt-5">
        <div className="text-lg font-bold mb-5 Montserrat flex items-center">
          {item.kor_name || item.eng_name}
          {item.deployed_link && (
            <a href={item.deployed_link} target="_blank">
              <i className="fa-solid fa-link ml-2.5"></i>
            </a>
          )}
        </div>
        <ProjectDetailSection title="요약" content={item.summary} />
        <ProjectDetailSection title="기간" content={`${item.start_date} - ${item.end_date}`} />
        <ProjectDetailSection title="역할" content={item.role_introduction} />
        {item.features_detail ? 
        <ProjectDetailSection title="구현 기능" content={item.features_detail} /> : 
        <ProjectDetailSection title="구현 기능" content={item.features} />}
        {/* <ProjectDetailSection title="트러블 슈팅" content={item.troubles} /> */}
        <ProjectDetailSection title="성과" content={item.results} />
        <ProjectDetailSection title="사용 기술" skills={usedSkills} />
      </div>
    </div>
  </div>
}

export default ProjectDetail