import useFirestore from "@/app/_hooks/useFirestore"
import { IProject } from "@/app/_types/project"
import { ISkill } from "@/app/_types/skills"
import { Dispatch, SetStateAction } from "react"
import IconButton from "../Button/IconButton"
import ImageGallery from "../ImageGallery/ImageGallery"

interface WorkDetailProps {
  item: IProject
  setSelectedWorkId: Dispatch<SetStateAction<number>>
  show: boolean
}

const WorkDetail = ({item, setSelectedWorkId, show}:WorkDetailProps) => {

  const { data: skillList } = useFirestore('skill');

  const usedSkills = (skillList as ISkill[])
    .filter(s => item.skill_id_list.includes(s.id))
    .sort((a,b) => a.id - b.id)
  
  const lightTitleList = ["JavaScript"]
  const darkTitleList = ["Next.js", "GitHub", "TypeScript", "Recoil"]

  const handleBack = () => {
    setSelectedWorkId(-1)
  }

  const DetailSection = ({ 
    title, 
    content,
    skills,
  }: {
    title: string
    content?: string | string[] | undefined
    skills?: ISkill[]
  }) => {
    return (content || skills) && (
      <>
        <div className="mb-4 last:mb-0">
          <div className="text-base mb-1 font-bold">{title}</div>
          {Array.isArray(content) ? (
            <ul className="list-disc">
              {content.map((item, index) => (
                <li 
                  key={`${title}-${index}`} 
                  className="text-sm ml-4 leading-relaxed mb-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm">{content}</div>
          )}
          {skills && (
            <div className="flex flex-wrap">
              {skills.map((skill, i) => (
                <div
                  key={`used-skill-${i}`}
                  className="py-1 px-2 mr-2 mb-2 rounded-md flex items-center relative border-[1px]"
                  style={{
                    background: skill.background,
                    borderColor: skill.background.replace("0.15", "1")
                  }}
                >
                  <img 
                    src={skill.img} 
                    className="h-4 mr-2" 
                    style={{filter: skill?.background === "#000" ? "invert(1)" : "none"}}
                  />
                  <div 
                    className={`
                      text-sm 
                      ${lightTitleList.includes(skill.title) && 'text-black'} 
                      ${darkTitleList.includes(skill.title) && 'text-white'}
                    `}
                  >
                    {skill.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  

  return <div className={`absolute w-full h-full bg-blue-1 bg-opacity-30 overflow-y-scroll hide-scroll-bar ${show ? "fade-in" : "fade-out"}`}>
    <div className="absolute top-[2vw] right-[2vw] dark:invert-0">
      <IconButton onClick={handleBack}>
        <img src="/images/icons/right-arrow.png" className="w-7 rotate-180"/>
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
          {item.deployed_link && <a href={item.deployed_link} target="_blank">
            <img src="/images/icons/link.png" className="w-5 ml-2.5 dark:invert transition-all duration-1000"/>
          </a>
          }
        </div>
        <DetailSection title="요약" content={item.summary} />
        <DetailSection title="기간" content={`${item.start_date} - ${item.end_date}`} />
        <DetailSection title="역할" content={item.role_introduction} />
        <DetailSection title="구현 기능" content={item.features} />
        <DetailSection title="성과" content={item.results} />
        <DetailSection title="사용 기술" skills={usedSkills} />
      </div>
    </div>
  </div>
}

export default WorkDetail