import { IProject } from "@/app/_types/project"

interface ProjectButtonProps {
  item: IProject
  isSelected: boolean
  selectedProjectId: number
  onClick: ()=>void
}

const ProjectButton = ({item, isSelected, selectedProjectId, onClick}:ProjectButtonProps) => {
  
  return <div 
    className={`w-[calc(100%-5px)] flex items-center justify-center transition-opacity duration-500 bg-opacity-15 cursor-pointer ${isSelected ? "fade-out" : "fade-in"}`}
    onClick={onClick}
  > 
    <img src={item.banner_img} className="w-full h-full object-cover"/>
    <button className={`detail-button absolute bottom-5 right-5 h-7 rounded-full overflow-hidden bg-white bg-opacity-30 hover:bg-opacity-50 xl:flex hidden items-center pl-[9px] backdrop-blur transition-all duration-300 box-shadow-2 ${selectedProjectId !== -1 && selectedProjectId !== item.id && "opacity-0"}`}>
      <img src="/images/icons/plus.png" className="w-2.5"/>
      <span 
        className="absolute left-1/2 top-1/2 2xl:text-xs text-[10px] whitespace-nowrap transition-opacity duration-500 text-[#000]"
        style={{transform: 'translate(-50%, -50%)'}}
      >
        자세히 보기
      </span>
    </button>
  </div>
}

export default ProjectButton