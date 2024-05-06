'use client';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/_constants";
import { CONTACT_INFO } from "@/app/_constants/contact";
import { MENU_MAP } from "@/app/_constants/menu";
import { activeSectionAtom } from "@/app/_store/activeSection";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import IconButton from "../../Button/IconButton";
import DarkMode from "./DarkMode";

const Header = () => {
  const router = useRouter()

  const windowSize = useWindowSize()
  const isMobile = windowSize.width! <= 768

  const activeSection = useRecoilValue(activeSectionAtom);
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setShowMenu(false)
    }
  };

  const RightButtonsGroup = () => {
    return <div className="flex items-center justify-center">
      <IconButton
        props={{
          className: "mr-10"
        }}
      >
        <a href={CONTACT_INFO.github.src} target="_blank">
          <img src="/images/icons/github.png" className="opacity-75"/>
        </a>
      </IconButton>
      <div className="-rotate-90">
        <DarkMode/>
      </div>
    </div>
  }

  const MobileMenu = useCallback(() => {
    return <div className="md:hidden flex">
      <button
        className="p-5 -mr-5"
        onClick={()=>setShowMenu(!showMenu)}
      >
        <img
          src="/images/icons/plus.png" 
          className={`w-4 dark:invert transition-transform ${showMenu ? 'rotate-45' : 'rotate-0'}`}
        />
      </button>
      <div 
        className={`sm:w-[250px] w-[calc(100vw-120px)] absolute flex flex-col right-[37.5px] top-16 transition-opacity text-right bg-white bg-opacity-40 dark:bg-opacity-15 backdrop-blur-lg px-9 pt-6 pb-4 rounded-3xl box-shadow-1 ${showMenu ? 'fade-in-right' : 'fade-out-right'}`}
      >
        {MENU_MAP.map(i => {
          return <button
            key={`mobile-menu-item-${i.index}`}
            className={`py-2.5 bg-transparent active:scale-90 active:bg-black dark:active:bg-white active:bg-opacity-10 dark:active:bg-opacity-15 rounded-lg transition-all tracking-tighter text-lg`}
            onClick={()=>handleMenuClick(i.title)}
          >
            {i.title}
          </button>
        })}
        <div className="mt-3">
          <RightButtonsGroup/>
        </div>
      </div>
    </div>
  }, [showMenu])

  return <div
    id="header"
    className={`fixed top-0 flex items-center justify-between lg:px-[40px] px-[30px] Montserrat tracking-tighter font-light z-30`}
    style={{
      height: HEADER_HEIGHT,
      width: isMobile ? "100vw" : `calc(100vw - ${SIDEBAR_WIDTH}px)`,
      marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
    }}
  >
    <button 
      id="logo" 
      className="2xl:text-2xl text-xl"
      onClick={()=>router.refresh()}
    >
      <span>
        Seowon Choi
      </span>
      <span className="font-black text-blue-1">
        &nbsp;.
      </span>
    </button>
    <div className="hidden md:flex w-1/3 min-w-96 max-w-[426px] items-center justify-between 2xl:text-lg text-base">
      {MENU_MAP.map(i => {
        return <button
          key={`menu-item-${i.index}`}
          className={`${i.title == activeSection ? 'opacity-100 border-blue-1' : 'opacity-50 border-transparent'} hover:opacity-100 transition-all tracking-tighter h-10 px-1 border-b-2`}
          onClick={()=>handleMenuClick(i.title)}
        >
          {i.title}
        </button>
      })}
    </div>
    {/* <div className="md:flex hidden">
      <RightButtonsGroup/>
    </div> */}
    <div className="md:hidden flex relative">
      <MobileMenu/>
    </div>
  </div>
}

export default Header;