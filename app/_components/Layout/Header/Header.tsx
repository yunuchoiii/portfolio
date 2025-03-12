'use client';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/_constants";
import { MENU_MAP } from "@/app/_constants/menu";
import { activeSectionAtom } from "@/app/_store/activeSection";
import { isMobileStateAtom } from "@/app/_store/isMobile";
import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const router = useRouter()

  const isRendering = useRecoilValue(isRenderingStateAtom)
  const isMobile = useRecoilValue(isMobileStateAtom)

  const activeSection = useRecoilValue(activeSectionAtom);

  const handleMenuClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div
    id="header"
    className={`fixed top-0 flex items-center justify-between lg:px-[40px] px-[30px] Montserrat tracking-tighter font-light z-30 bg-white/0 dark:bg-black/0 backdrop-blur-sm ${isRendering ? "opacity-0" : "fade-in"}`}
    style={{
      height: HEADER_HEIGHT,
      width: isMobile ? "100vw" : `calc(100vw - ${SIDEBAR_WIDTH}px)`,
      marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
    }}
  >
    <button 
      id="logo" 
      className="2xl:text-2xl text-xl px-3 py-1.5 -ml-3 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-15"
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
        return <nav key={`menu-item-${i.index}`}>
          <button
            className={`${i.title == activeSection ? 'opacity-100 border-blue-1' : 'opacity-50 border-transparent'} hover:opacity-100 transition-all tracking-tighter h-10 px-1 border-b-2`}
            onClick={()=>handleMenuClick(i.title)}
          >
            {i.title}
          </button>
        </nav>
      })}
    </div>
    <div className="md:hidden flex">
      <MobileMenu
        handleMenuClick={handleMenuClick}
      />
    </div>
  </div>
}

export default Header;