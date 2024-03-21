'use client';

import { HEADER_HEIGHT } from "@/app/_constants";
import useFirestore from "@/app/_hooks/useFirestore";
import { IProject } from "@/app/_types/project";
import { ISkill, ISkillGroup } from "@/app/_types/skills";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SkillProjectBox from "./SkillProjectBox";

interface SkillsProps {
  setSelectedWorkId: Dispatch<SetStateAction<number>>
}

const Skills = ({setSelectedWorkId}:SkillsProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: skillGroupList } = useFirestore('skill_group');
  const { data: skillList } = useFirestore('skill');
  const { data: projectList } = useFirestore('project');

  const projectListBySkillId = (skillId:number) => {
    return (projectList as IProject[]).filter(i => i.skill_id_list.includes(skillId)).sort((a,b) => a.id - b.id)
  }

  const handleSkill = (skill: ISkill) => {
    if (skill.id !== selectedSkill?.id) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedSkill(skill);
      }, selectedSkill && !isMobile ? 500 : 0);
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
  const darkTitleList = ["Next.js", "GitHub", "TypeScript", "Recoil"]

  return <div className="w-full h-full flex justify-center">
    <div className="flex-1 sm:mr-5 mr-0">
      {(skillGroupList as ISkillGroup[]).sort((a, b) => a.id - b.id).map(group => {
        const children = (skillList as ISkill[])
          .filter(i => i.parent_id === group.id)
          .sort((a, b) => a.id - b.id);
        return <div key={`skill-group-${group.id}`} className="mt-[50px] first:mt-0">
          <div className="Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base font-semibold tracking-tighter">
            {group.title}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {children.map(i => {
              const project_count = projectListBySkillId(i?.id).length
              return <div
                key={`skill-item-${i.id}`}
              >
                <button
                  className="skill-button relative xl:w-[200px] xl:h-[50px] sm:w-[170px] w-[100%] h-[40px] mt-[30px] flex items-center"
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
                <div 
                  className="sm:hidden block w-full bg-blue-4 bg-opacity-15 xl:rounded-[20px] rounded-[15px] overflow-hidden transition-all duration-500"
                  style={{
                    height: i.id === selectedSkill?.id ? 125 + (70 * project_count) : "0px",
                    marginTop: i.id === selectedSkill?.id ? 20 : 0
                  }}
                >
                  <SkillProjectBox 
                    skillItem={i} 
                    projectList={projectListBySkillId(i.id)}
                    setSelectedWorkId={setSelectedWorkId}
                  />
                </div>
              </div>
            })}
          </div>
        </div>
      })}
    </div>
    <div 
      className="w-[30%] min-w-[270px] max-w-[330px] max-h-[580px] sticky top-24 sm:block hidden"
      style={{height: `calc(100vh - ${HEADER_HEIGHT * 2}px)`}}
    >
      <div 
        className="w-full h-full bg-blue-4 bg-opacity-15 xl:rounded-[20px] rounded-[15px] overflow-hidden transition-[width] duration-500 overflow-y-scroll hide-scroll-bar"
        style={{width: isAnimating || !selectedSkill ? 0 : '100%'}}
      >
        <SkillProjectBox 
          skillItem={selectedSkill as ISkill} 
          projectList={projectListBySkillId(selectedSkill?.id as number)}
          isAnimating={isAnimating}
          setSelectedWorkId={setSelectedWorkId}
        />
      </div>
    </div>
  </div>
}

export default Skills;