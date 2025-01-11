import { IProjectFeature, IProjectTrouble } from "@/app/_types/project";
import { ISkill } from "@/app/_types/skills";
import { DarkTitleSkillList, LightTitleSkillList } from "../Skills/Skills";

export interface ProjectDetailSectionProps {
  title: string
  content?: string | string[] | IProjectFeature[] | IProjectTrouble[] | undefined
  skills?: ISkill[]
  type?: "features" | "features_detail" | "troubles"
}

const ProjectDetailSection = ({ 
  title, 
  content,
  skills,
  type,
}: ProjectDetailSectionProps) => {

  const Contents = ({ content }: { content: string | string[] }) => {
    return (
      typeof content === "string" ? 
      <div className="text-sm">{content}</div> :
      <ul className="list-disc">
        {content.map((item, index) => (
          <li key={`content-${index}`} className="text-sm ml-4 leading-relaxed mb-1">
            {item}
          </li>
        ))}
      </ul>
    )
  };

  const Features = ({ content }: { content: string[] }) => {
    return (
      <ul className="list-disc">
        {content.map((item, index) => (
          <li key={`content-${index}`} className="text-sm ml-4 leading-relaxed mb-1">
            {item}
          </li>
        ))}
      </ul>
    ); 
  }

  const DetailFeatures = ({ content }: { content: IProjectFeature[] }) => {
    return (
      <div>
        {content.map((item, index) => (
          <ul key={`feature-${index}`} className="list-disc mb-4 ml-4">
            <li className="font-bold text-sm mt-2 mb-2">{item.feature}</li>
            <ul className="list-disc text-sm ml-4">
              {item.description.map((desc, descIndex) => (
                <li key={`description-${descIndex}`} className="leading-relaxed mb-1">
                  {desc}
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    );
  }

  const Skills = ({skills}:{skills: ISkill[]}) => {
    return <div className="flex flex-wrap">
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
              ${LightTitleSkillList.includes(skill.title) ? 'text-black' : ''} 
              ${DarkTitleSkillList.includes(skill.title) ? 'text-white' : ''}
            `}
          >
            {skill.title}
          </div>
        </div>
      ))}
    </div>
  }

  return (content || skills) && (
    <>
      <div className="mb-4 last:mb-0">
        <div className="text-base mb-1 font-bold">{title}</div>
        {content && (
          type === "features" ?
            <Features content={content as string[]} /> : 
          type === "features_detail" ? 
            <DetailFeatures content={content as IProjectFeature[]} /> : 
          <Contents content={content as string | string[]} />
        )}
        {skills && <Skills skills={skills}/>}
      </div>
    </>
  );
};

export default ProjectDetailSection;