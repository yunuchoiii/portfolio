'use client'

import { isMobileStateAtom } from "@/app/_store/isMobile";
import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useTheme } from "next-themes";
import Image from "next/image";
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
      className={`relative md:w-full w-[105%] md:h-[64vh] h-[calc(100vh-340px)] md:-ml-0 -ml-[2.5%] md:px-[5%] px-[7.5%] pb-8 flex flex-col justify-end Montserrat md:rounded-3xl rounded-2xl overflow-hidden box-shadow-1 transition-[height] duration-300 ${isRendering ? "opacity-0" : "fade-in"}`}
    >
      {themeState && <Image
        src={`/images/main/home-bg-${themeState}.png`}
        alt="home-background"
        fill
        objectFit="cover"
        className={`-z-10 opacity-50 dark:opacity-70 brightness-90 ${isRendering ? "scale-150" : "scale-100"} transition-all duration-[5s]`}
      />}
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
    </div>
    <div 
      className={`md:w-full w-[105%] md:h-[10vh] h-[60px] md:-ml-0 -ml-[2.5%] mt-5 grid grid-cols-2 gap-5 ${isRendering ? "opacity-0" : "fade-in"}`}
      style={{
        animationDelay: "3s"
      }}
    >
      {buttons.map((b, i) => (
        <button 
          key={`home-button-${i}`}
          className={`group relative h-full bg-blue-2 dark:bg-blue-4 bg-opacity-5 dark:bg-opacity-5 Montserrat md:rounded-3xl rounded-2xl border-2 border-blue-1 border-opacity-30 box-shadow-1 uppercase active:scale-95 transition-all duration-100 overflow-hidden`}
          onClick={()=>handleButton(b.section)}
        >
          <span>{b.title}</span>
          {!isMobile && (
            <i className={`${b.icon} text-xl absolute right-10 -top-1/2 -translate-y-1/2 group-hover:top-1/2 transition-all duration-500 opacity-50 text-blue-2 dark:text-blue-4`}></i>
          )}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-[50vw] group-hover:h-[50vw] rounded-full bg-blue-1 dark:bg-blue-4 bg-opacity-10 dark:bg-opacity-10 transition-all duration-700"></div>
        </button>
      ))}
    </div>
  </>
}

export default Home;