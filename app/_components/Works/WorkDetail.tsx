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

  const DetailSection = ({ 
    title, 
    content 
  }: {
    title: string
    content: string | string[] | undefined
  }) => {
    return content && (
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
      </div>
    );
  };
  

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
      <div className="h-full w-[1px] bg-[#333] dark:bg-white bg-opacity-30 dark:bg-opacity-30 mx-10"></div>
      <div className="flex-1 h-full overflow-y-scroll scroll-smooth">
        <div className="text-lg font-bold mb-5 Montserrat">
          {item.kor_name || item.eng_name}
        </div>
        <DetailSection title="요약" content={item.summary} />
        <DetailSection title="기간" content={`${item.start_date} - ${item.end_date}`} />
        <DetailSection title="역할" content={item.role_introduction} />
        <DetailSection title="구현 기능" content={item.features} />
        <DetailSection title="성과" content={item.results} />
      </div>
    </div>
  </div>
}

export default WorkDetail