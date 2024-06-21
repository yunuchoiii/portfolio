'use client'

import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Home = () => {
  const isRendering = useRecoilValue(isRenderingStateAtom)

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
  
  return <>
    <div 
      className={`relative md:w-[110%] w-[105%] md:h-[78vh] h-[calc(100vh-180px)] md:-ml-[5%] -ml-[2.5%] px-[5%] flex flex-col justify-end Montserrat rounded-3xl overflow-hidden box-shadow-1 ${isRendering ? "opacity-0" : "fade-in"}`}
    >
      {themeState && <Image
        src={`/images/main/home-bg-${themeState}.png`}
        alt="home-background"
        fill
        objectFit="cover"
        className="-z-10 opacity-70"
      />}
      <div className="2xl:text-[40px] xl:text-3xl lg:text-2xl text-xl font-bold lg:mb-5 md:mb-4 mb-3">
        Hello. I am <br/>
      </div>
      <div
        className={`2xl:text-[112px] xl:text-[90px] lg:text-[75px] text-[50px] font-bold leading-[90%] tracking-tight lg:mb-12 md:mb-10 mb-8 -ml-1 ${isRendering ? "opacity-0" : "fade-in"}`}
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
        className={`w-full flex flex-col items-center ${isRendering ? "opacity-0" : "fade-in-bottom"}`}
        style={{animationDelay: "3s"}}
      >
        <button 
          className="group relative flex flex-col items-center mt-5 mb-8"
          onClick={()=>handleButton("About")}
        >
          <span className="Montserrat mb-2.5">MORE</span>
          <i className="fa-solid fa-chevron-down text-lg relative top-0 group-hover:top-3 transition-all duration-300"></i>
        </button>
      </div>
    </div>
  </>
}

export default Home;