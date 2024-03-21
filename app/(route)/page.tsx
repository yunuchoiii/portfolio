'use client';

import { useState } from "react";
import About from "../_components/About/About";
import Home from "../_components/Home/Home";
import FullPage from "../_components/Layout/Page/FullPage";
import Skills from "../_components/Skills/Skills";
import Works from "../_components/Works/Works";

export default function Main() {

  const [selectedWorkId, setSelectedWorkId] = useState<number>(-1)

  return (
    <div className="relative scroll-container-y h-screen overflow-x-hidden">
      <FullPage id="Home">
        <Home/>
      </FullPage>
      <FullPage id="About" title="About">
        <About/>
      </FullPage>
      <FullPage id="Skills" title="Skills" longPage>
        <Skills
          setSelectedWorkId={setSelectedWorkId}
        />
      </FullPage>
      <FullPage id="Works" title="Works">
        <Works
          selectedWorkId={selectedWorkId}
          setSelectedWorkId={setSelectedWorkId}
        />
      </FullPage>
    </div>
  );
}
