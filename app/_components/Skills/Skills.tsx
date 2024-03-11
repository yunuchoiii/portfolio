'use client';

import { HEADER_HEIGHT } from "@/app/_constants";
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
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedSkill(skill);
      }, selectedSkill ? 500 : 0);
    }
  };

  useEffect(() => {
    if (selectedSkill) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }
  }, [selectedSkill]);

  const lightTitleList = ["JavaScript"]
  const darkTitleList = ["Next.js", "GitHub", "TypeScript"]

  return <div className="w-full h-full flex justify-center">
    <div className="flex-1 mr-5">
      {(skillGroupList as ISkillGroup[]).sort((a, b) => a.id - b.id).map(group => {
        const children = (skillList as ISkill[])
          .filter(i => i.parent_id === group.id)
          .sort((a, b) => a.id - b.id);
        return <div key={`skill-group-${group.id}`} className="mt-[50px] first:mt-0">
          <div className="Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base font-semibold tracking-tighter">
            {group.title}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {children.map(i => (
              <button
                key={`skill-item-${i.id}`}
                className="skill-button relative xl:w-[200px] xl:h-[50px] w-[170px] h-[40px] flex items-center mt-[30px]"
                onClick={()=>handleSkill(i)}
              >
                <div 
                  className="skill-logo xl:w-[50px] xl:h-[50px] w-[40px] h-[40px] rounded-[10px] p-[10px] absolute transition-all"
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
                  Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base relative xl:left-[70px] left-[60px]
                  ${lightTitleList.includes(i.title) && 'skill-light'} 
                  ${darkTitleList.includes(i.title) && 'skill-dark'}
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
    <div 
      className="w-[30%] min-w-[270px] max-w-[330px] max-h-[580px] sticky top-24"
      style={{height: `calc(100vh - ${HEADER_HEIGHT * 2}px)`}}
    >
      <div 
        className="w-full h-full bg-blue-4 bg-opacity-15 xl:rounded-[20px] rounded-[15px] overflow-hidden transition-[width] duration-500"
        style={{width: isAnimating || !selectedSkill ? 0 : '100%'}}
      >
        <div className="m-5">
          <div className="flex items-center">
            <div
              className="skill-logo xl:w-[50px] xl:h-[50px] w-[40px] h-[40px] rounded-[10px] p-[10px] shrink-0"
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
            <div className="Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base ml-5 whitespace-nowrap" >
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