'use client';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/_constants";
import { CONTACT_INFO } from "@/app/_constants/contact";
import { MENU_MAP } from "@/app/_constants/menu";
import { activeSectionAtom } from "@/app/_store/activeSection";
import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useRecoilValue } from "recoil";
import IconButton from "../../Button/IconButton";
import DarkMode from "../Header/DarkMode";

const Sidebar = () => {
  const activeSection = useRecoilValue(activeSectionAtom)
  const isRendering = useRecoilValue(isRenderingStateAtom)

  const handleMenuClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div 
    className={`hidden md:flex fixed z-40 h-screen`}
    style={{width:SIDEBAR_WIDTH}}
  >
    <div className={`flex flex-col items-center justify-between h-full border-r border-blue-1 pb-8 ${isRendering ? "opacity-0" : "fade-in"}`}>
      <div
        className="flex items-center justify-center"
        style={{height: HEADER_HEIGHT}}
      >
        <img src="/images/main/logo_white.png" className="w-2/5 hidden dark:block"/>
        <img src="/images/main/logo_black.png" className="w-2/5 block dark:hidden"/>
      </div>
      <div className="flex flex-col items-center justify-center backdrop-blur-md px-1.5 py-2.5 rounded-xl box-shadow-2 dark:bg-white dark:bg-opacity-5">
        {MENU_MAP.map((menu, index) => (
          <button
            key={`side-menu-${index}`}
            className={`w-10 h-10 rounded-full hover:bg-blue-1 hover:bg-opacity-30 flex items-center justify-center mb-5 last:mb-0 transition-all 
            ${activeSection === menu.title ? "text-blue-1" : "opacity-50"}`}
            onClick={() => handleMenuClick(menu.title)}
          >
            <i className={`${menu.iconClassName} text-xl`}></i>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <IconButton
          props={{
            className: "mb-5"
          }}
        >
          <a href={CONTACT_INFO.github.src} target="_blank">
            <img src="/images/icons/github.png" className="opacity-75"/>
          </a>
        </IconButton>
        <DarkMode/>
      </div>
    </div>
  </div>
}

export default Sidebar;