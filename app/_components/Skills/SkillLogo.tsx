import { ISkill } from "@/app/_types/skills"

interface SkillLogoProps {
  skill: ISkill
}

const SkillLogo = ({skill}:SkillLogoProps) => {
  return <div
    className="skill-logo xl:w-[50px] xl:h-[50px] w-[40px] h-[40px] rounded-[10px] p-[10px] shrink-0"
    style={{background: skill?.background}}
  >
    <img 
      src={skill?.img}
      alt={skill?.title}
      className="h-full"
      style={{
        filter: skill?.background === "#000" ? "invert(1)" : "none"
      }}
    />
  </div>
}

export default SkillLogo