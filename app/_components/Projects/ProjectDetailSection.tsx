import { ISkill } from "@/app/_types/skills";

const ProjectDetailSection = ({ 
  title, 
  content,
  skills,
}: {
  title: string
  content?: string | string[] | undefined
  skills?: ISkill[]
}) => {
  const lightTitleList = ["JavaScript"]
  const darkTitleList = ["Next.js", "GitHub", "TypeScript", "Recoil", "React", "Tailwind.css"]

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
                    ${lightTitleList.includes(skill.title) ? 'text-black' : ''} 
                    ${darkTitleList.includes(skill.title) ? 'text-white' : ''}
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

export default ProjectDetailSection;