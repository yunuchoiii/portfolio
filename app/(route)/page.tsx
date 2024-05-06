'use client';

import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import About from "../_components/About/About";
import Contact from "../_components/Contact/Contact";
import Home from "../_components/Home/Home";
import FullPage from "../_components/Layout/Page/FullPage";
import Skills from "../_components/Skills/Skills";
import Works from "../_components/Works/Works";
import { SIDEBAR_WIDTH } from "../_constants";

export default function Main() {

  const windowSize = useWindowSize()
  const isMobile = windowSize.width! <= 768

  const [selectedWorkId, setSelectedWorkId] = useState<number>(-1)
  const [isWorkAnimating, setIsWorkAnimating] = useState<boolean>(false)

  const handleWorkButton = (id:number) => {
    setSelectedWorkId(id)
    setIsWorkAnimating(true)

    setTimeout(()=>{
      setIsWorkAnimating(false)
    }, 500)
  }

  return (
    <div 
      className="relative scroll-container-y h-screen overflow-x-hidden"
      style={{paddingLeft: !isMobile ? SIDEBAR_WIDTH : 0 }}
    >
      <FullPage id="Home">
        <Home/>
      </FullPage>
      <FullPage id="About" longPage>
        <About/>
      </FullPage>
      <FullPage id="Skills" title="Skills" longPage>
        <Skills
          handleWorkButton={handleWorkButton}
        />
      </FullPage>
      <FullPage id="Works" title="Works">
        <Works
          selectedWorkId={selectedWorkId}
          setSelectedWorkId={setSelectedWorkId}
          isWorkAnimating={isWorkAnimating}
          handleWorkButton={handleWorkButton}
        />
      </FullPage>
      <FullPage id="Contact" longPage={isMobile}>
        <Contact/>
      </FullPage>
    </div>
  );
}
