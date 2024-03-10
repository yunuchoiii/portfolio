'use client';

import useFirestore from "@/app/_hooks/useFirestore";
import { ISkill, ISkillGroup } from "@/app/_types/skills";
import { useEffect, useState } from "react";

const Skills = () => {

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: skillGroupList } = useFirestore('skill_list');
  const { data: skillList } = useFirestore('skill');

  const handleSkill = (skill: ISkill) => {
    if (skill.id !== selectedSkill?.id) {
      setIsAnimating(true); // 애니메이션 시작
      setTimeout(() => {
        setSelectedSkill(skill);
      }, selectedSkill ? 500 : 0); // 박스가 완전히 닫히는 시간에 맞춰 selectedSkill을 변경합니다.
    }
  };

  useEffect(() => {
    if (selectedSkill) {
      // selectedSkill이 설정되면 애니메이션을 완료합니다.
      setTimeout(() => {
        setIsAnimating(false);
      }, 300); // 박스가 다시 열리는 데 걸리는 시간
    }
  }, [selectedSkill]);

  return <div className="w-full h-full flex items-end justify-between">
    <div className="flex-1">
      {(skillGroupList as ISkillGroup[]).sort((a, b) => a.id - b.id).map(group => {
        const children = (skillList as ISkill[])
          .filter(i => i.parent_id === group.id)
          .sort((a, b) => a.id - b.id);
        return <div key={`skill-group-${group.id}`} className="mt-[50px] first:mt-0">
          <div className="Montserrat 2xl:text-2xl text-xl font-semibold tracking-tighter">
            {group.title}
          </div>
          <div className="flex flex-wrap">
            {children.map(i => (
              <button
                key={`skill-item-${i.id}`}
                className="skill-button relative w-[200px] h-[50px] flex items-center mr-[50px] mt-[30px]"
                onClick={()=>handleSkill(i)}
              >
                <div 
                  className="skill-logo w-[50px] h-[50px] rounded-[10px] p-[10px] absolute transition-all"
                  style={{background: i.background}}
                >
                  <img 
                    src={i.img} 
                    alt={i.title}
                    className="h-full"
                    style={{
                      filter: i.background === "#000" ? "invert(1)" : "none"
                    }}
                  />
                </div>
                <div 
                className={`
                  Montserrat 2xl:text-xl text-lg relative left-[70px] 
                  ${i.title === "JavaScript" && 'skill-light'} 
                  ${(i.title === "Next.js" || i.title === "GitHub") && 'skill-dark'}
                `}
                >
                  {i.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      })}
    </div>
    <div className="w-[313px] h-[534px]">
      <div 
        className="w-full h-full bg-blue-4 bg-opacity-15 rounded-[30px] overflow-hidden transition-[width] duration-500"
        style={{
          width: isAnimating || !selectedSkill ? 0 : '100%',
        }}
      >
        <div className="m-5">
          <div className="flex items-center">
            <div
              className="skill-logo w-[50px] h-[50px] rounded-[10px] p-[10px] shrink-0"
              style={{background: selectedSkill?.background}}
            >
              <img 
                src={selectedSkill?.img}
                alt={selectedSkill?.title}
                className="h-full"
                style={{
                  filter: selectedSkill?.background === "#000" ? "invert(1)" : "none"
                }}
              />
            </div>
            <div className="Montserrat 2xl:text-xl text-lg ml-5 whitespace-nowrap" >
              {selectedSkill?.title}
            </div>
          </div>
          <div className="w-full h-[5px] rounded-md bg-blue-2 mt-5 mb-[30px] overflow-hidden">
            <div 
              className="h-full rounded-md bg-blue-4 bg-opacity-80"
              style={{
                width: `${selectedSkill?.grade}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Skills;