'use client'

import { isMobileStateAtom } from "@/app/_store/isMobile";
import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Home = () => {
  const isRendering = useRecoilValue(isRenderingStateAtom)
  const isMobile = useRecoilValue(isMobileStateAtom)

  const {theme, systemTheme} = useTheme()
  const [themeState, setThemeState] = useState<string>()

  useEffect(()=>{
    if (theme == "system") {
      setThemeState(systemTheme)
    } else {
      setThemeState(theme)
    }
  }, [theme, systemTheme])

  const handleButton = (sectionId:string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const buttons = [
    {
      title: "more",
      section: "About",
      icon: "fa-solid fa-arrow-down"
    },
    {
      title: "contact",
      section: "Contact",
      icon: "fa-solid fa-paper-plane"
    },
  ]
  
  return <>
    <div 
      className={`relative w-full md:h-[64vh] h-[calc(100vh-200px)] flex flex-col justify-end Montserrat overflow-hidden ${isRendering ? "opacity-0" : "fade-in"}`}
    >
      <div className="2xl:text-[40px] xl:text-3xl lg:text-2xl text-lg font-bold lg:mb-5 md:mb-4 mb-3">
        Hello. I am <br/>
      </div>
      <div
        className={`2xl:text-[112px] xl:text-[90px] lg:text-[75px] text-[46px] font-bold leading-[90%] tracking-tight lg:mb-12 md:mb-10 mb-8 -ml-1 ${isRendering ? "opacity-0" : "fade-in"}`}
        style={{animationDelay: "1s"}}
      >
        <span className="text-blue-1 dark:text-blue-4">Front</span>end<br/>
        Developer
        <span className="text-blue-1 dark:text-blue-4">&nbsp;.</span>
      </div>
      <div 
        className={`Pretendard 2xl:text-2xl xl:text-xl text-base ${isRendering ? "opacity-0" : "fade-in"}`}
        style={{animationDelay: "2s"}}
      >
        안녕하세요. 트렌디한 개발자, 최서원입니다.
      </div>
      <div 
        className={`flex items-center justify-center mt-5 ${isRendering ? "opacity-0" : "fade-in"}`}
        style={{animationDelay: "3s"}}
      >
        <button onClick={()=>handleButton("About")} className="p-2.5 group">
          <i className={`fa-solid fa-chevron-down text-xl relative top-0 ${isMobile ? `group-hover:top-0` : `group-hover:top-4`} transition-all duration-300 opacity-80 text-black dark:text-white`}></i>
        </button>
      </div>
    </div>
  </>
}

export default Home;