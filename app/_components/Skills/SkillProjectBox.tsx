import { IProject } from "@/app/_types/project"
import { ISkill } from "@/app/_types/skills"
import SkillLogo from "./SkillLogo"

interface ProjectBoxProps {
  skillItem: ISkill
  projectList?: IProject[]
  isAnimating?: boolean
  handleWorkButton: (id: number) => void
}

const SkillProjectBox = ({skillItem, projectList, isAnimating, handleWorkButton}:ProjectBoxProps) => {
  const skill = skillItem

  const handleProject = (id:number) => {
    const section = document.getElementById("Works");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(()=>{
      handleWorkButton(id)
    }, 1000)
  }

  return <div className="m-5">
    <div className="flex items-center">
      <SkillLogo skill={skill!}/>
      <div className="Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base ml-5 whitespace-nowrap" >
        {skill?.title}
      </div>
    </div>
    <div className="w-full h-[5px] rounded-md bg-blue-2 mt-5 mb-[30px] overflow-hidden">
      <div 
        className="h-full rounded-md bg-blue-4 bg-opacity-80"
        style={{width: `${skill?.grade}%`}}
      />
    </div>
    {projectList && <div>
      {projectList.filter(p => p.show_yn != false).map(p => {
        return <button
          key={`project-item-${p.id}`}
          className="w-full h-[60px] bg-blue-1 dark:bg-blue-4 bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-30 active:scale-95 transition-all duration-300 rounded-2xl mb-2.5 px-5 flex items-center justify-between"
          style={{opacity: isAnimating ? 0 : 100}}
          onClick={()=>handleProject(p.id)}
        >
          <span className="xl:text-base text-sm whitespace-nowrap">{p.kor_name}</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      })}
    </div>}
  </div>
}

export default SkillProjectBox