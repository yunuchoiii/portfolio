'use client';

import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import About from "../_components/About/About";
import Contact from "../_components/Contact/Contact";
import Home from "../_components/Home/Home";
import FullPage from "../_components/Layout/Page/FullPage";
import Projects from "../_components/Projects/Projects";
import Skills from "../_components/Skills/Skills";
import { SIDEBAR_WIDTH } from "../_constants";
import { isMobileStateAtom } from "../_store/isMobile";

export default function Main() {
  const [isMobile, setIsMobile] = useRecoilState(isMobileStateAtom) // mobile 여부 state

  // isMobile state control
  const windowSize = useWindowSize()
  useEffect(() => {
    setIsMobile(windowSize.width! < 768);
  }, [windowSize])

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
    <main 
      className={`relative scroll-container-y ${isMobile ? "pb-10" : "h-dvh"} overflow-x-hidden transition-all duration-700`}
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
    </main>
  );
}
