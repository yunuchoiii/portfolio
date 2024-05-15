'use client';

import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import About from "../_components/About/About";
import Contact from "../_components/Contact/Contact";
import Home from "../_components/Home/Home";
import FullPage from "../_components/Layout/Page/FullPage";
import Projects from "../_components/Projects/Projects";
import Skills from "../_components/Skills/Skills";
import { SIDEBAR_WIDTH } from "../_constants";
import { activeSectionAtom } from "../_store/activeSection";

export default function Main() {
  const activeSection = useRecoilValue(activeSectionAtom)

  const windowSize = useWindowSize()
  const isMobile = windowSize.width! <= 768

  const [selectedProjectId, setSelectedProjectId] = useState<number>(-1)
  const [isProjectAnimating, setIsProjectAnimating] = useState<boolean>(false)

  const handleProjectButton = (id:number) => {
    setSelectedProjectId(id)
    setIsProjectAnimating(true)

    setTimeout(()=>{
      setIsProjectAnimating(false)
    }, 500)
  }

  return (
    <div 
      className={`relative scroll-container-y ${!isMobile && "h-dvh"} overflow-x-hidden transition-all duration-700 ${activeSection == "Home" || activeSection == "Contact" ? "backdrop-blur-0" :  "2xl:backdrop-blur-[75px] lg:backdrop-blur-[55px] sm:backdrop-blur-[45px] backdrop-blur-[35px] 2xl:dark:backdrop-blur-[100px] lg:dark:backdrop-blur-[75px] sm:dark:backdrop-blur-[57px] dark:backdrop-blur-[40px]"}`}
      style={{marginLeft: !isMobile ? SIDEBAR_WIDTH : 0 }}
    >
      <FullPage id="Home">
        <Home/>
      </FullPage>
      <FullPage id="About" longPage>
        <About/>
      </FullPage>
      <FullPage id="Skills" title="Skills" longPage>
        <Skills
          handleProjectButton={handleProjectButton}
        />
      </FullPage>
      <FullPage id="Projects" title="Projects">
        <Projects
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          isProjectAnimating={isProjectAnimating}
          handleProjectButton={handleProjectButton}
        />
      </FullPage>
      <FullPage id="Contact" longPage={isMobile}>
        <Contact/>
      </FullPage>
    </div>
  );
}
