'use client';

import { HEADER_HEIGHT } from "@/app/_constants";
import useFirestore from "@/app/_hooks/useFirestore";
import { isMobileStateAtom } from "@/app/_store/isMobile";
import { IProject } from "@/app/_types/project";
import { ISkill, ISkillGroup } from "@/app/_types/skills";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SkillProjectBox from "./SkillProjectBox";

interface SkillsProps {
  handleProjectButton: (id: number) => void
}

const Skills = ({handleProjectButton}:SkillsProps) => {
  const isMobile = useRecoilValue(isMobileStateAtom)

  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: skillGroupList } = useFirestore('skill_group');
  const { data: skillList } = useFirestore('skill');
  const { data: projectList } = useFirestore('project');

  const projectListBySkillId = (skillId:number) => {
    return (projectList as IProject[])
      .filter(p => p.show_yn != false)
      .filter(i => i.skill_id_list.includes(skillId))
      .sort((a,b) => a.id - b.id)
  }

  const handleSkill = (skill: ISkill) => {
    if (skill.id !== selectedSkill?.id && skill.parent_id !== 2) {
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
  const darkTitleList = ["Next.js", "GitHub", "TypeScript", "Recoil", "React", "Tailwind.css"]

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div className="w-full h-full flex justify-center md:mb-0 mb-20">
    <div ref={ref} className="flex-1 sm:mr-5 mr-0">
      {(skillGroupList as ISkillGroup[]).sort((a, b) => a.id - b.id).map((group, index) => {
        const children = (skillList as ISkill[])
          .filter(i => i.parent_id === group.id)
          .sort((a, b) => a.id - b.id);
        return <div 
          key={`skill-group-${group.id}`} 
          className={`mt-[50px] first:mt-0 ${entry?.intersectionRatio ? "fade-in-right" : "opacity-0"}`}
          style={{
            animationDelay: `${0.5 + 0.5 * index}s`
          }}
        >
          <div className="Montserrat 2xl:text-xl xl:text-lg lg:text-md md:text-base font-semibold tracking-tighter">
            {group.title}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {children.map(i => {
              const project_count = projectListBySkillId(i?.id).length
              return i.show_yn != false && <div
                key={`skill-item-${i.id}`}
              >
                <button
                  className={`skill-button relative xl:w-[200px] sm:w-[170px] w-[100%] flex items-center transition-all duration-500
                  ${i.id === selectedSkill?.id && isMobile ? "h-0 overflow-hidden mt-0 opacity-0" : "xl:h-[50px] h-[40px] mt-[30px]"}`}
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
                      ${lightTitleList.includes(i.title) ? 'skill-light' : ''} 
                      ${darkTitleList.includes(i.title) ? 'skill-dark' : ''}
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
                    handleProjectButton={handleProjectButton}
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
        className="w-full h-full bg-blue-1 dark:bg-blue-4 bg-opacity-25 dark:bg-opacity-20 xl:rounded-[20px] rounded-[15px] overflow-hidden transition-[width] duration-500 overflow-y-scroll hide-scroll-bar"
        style={{width: isAnimating || !selectedSkill ? 0 : '100%'}}
      >
        <SkillProjectBox 
          skillItem={selectedSkill as ISkill} 
          projectList={projectListBySkillId(selectedSkill?.id as number)}
          isAnimating={isAnimating}
          handleProjectButton={handleProjectButton}
        />
      </div>
    </div>
  </div>
}

export default Skills;