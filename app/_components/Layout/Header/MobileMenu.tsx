import { CONTACT_INFO } from "@/app/_constants/contact"
import { MENU_MAP } from "@/app/_constants/menu"
import { activeSectionAtom } from "@/app/_store/activeSection"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import IconButton from "../../Button/IconButton"
import DarkMode from "./DarkMode"

interface MobileMenuProps {
  handleMenuClick: (sectionId: string) => void
} 

const MobileMenu = ({handleMenuClick}:MobileMenuProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showButtonsGroup, setShowButtonsGroup] = useState<boolean>(false);

  const activeSection = useRecoilValue(activeSectionAtom)

  const mobileMenuMap = [
    ...MENU_MAP,
    {
      index: 6,
      title: "ButtonsGroup",
      iconClassName: "fa-solid fa-ellipsis"
    }
  ]

  return <>
    {/* 메뉴 열기 버튼 */}
    <button
      className="p-5 -mr-5"
      onClick={()=>setShowMenu(!showMenu)}
    >
      <img
        src="/images/icons/plus.png" 
        className={`w-4 dark:invert transition-transform ${showMenu ? 'rotate-45' : 'rotate-0'}`}
      />
    </button>
    {/* 메뉴 컴포넌트 */}
    <div
      className={`w-[calc(100vw-40px)] h-[60px] px-2 py-1.5 fixed z-50 flex justify-between items-center left-[20px] bottom-5 text-right bg-[#e8f3f6] dark:bg-[#172026] border-[1px] border-blue-1 border-opacity-50 rounded-full box-shadow-1 overflow-x-scroll ${showMenu ? 'fade-in-bottom' : 'fade-out-bottom'}`}
      style={{animationDuration: "0.3s"}}
    >
      {mobileMenuMap.map(i => {
        const isSelected = i.title === activeSection;
        return <nav key={`mobile-menu-item-${i.index}`}>
          <button
            className={`w-[46px] h-[46px] bg-transparent active:scale-90 active:bg-black dark:active:bg-white active:bg-opacity-10 dark:active:bg-opacity-15 rounded-full transition-all tracking-tighter text-lg ${isSelected ? "text-blue-1 dark:text-blue-4" : ""}`}
            onClick={()=>{
              if (i.title !== "ButtonsGroup") {
                handleMenuClick(i.title)
              } else {
                setShowButtonsGroup(!showButtonsGroup)
              }
            }}
          >
            <i className={`${i.iconClassName} opacity-85`}></i>
          </button>
        </nav>
      })}
    </div>
    {/* ButtonsGroup */}
    <div className={`fixed h-[60px] z-40 right-5 flex items-center justify-center pl-2 pr-[38px] transition-all duration-300 ${showButtonsGroup && showMenu ? "opacity-100 bottom-[84px]" : "opacity-0 bottom-5"}`}>
      <IconButton
        props={{
          className: "mr-10"
        }}
      >
        <a href={CONTACT_INFO.github.src} target="_blank">
          <img src="/images/icons/github.png"/>
        </a>
      </IconButton>
      <div className="-rotate-90">
        <DarkMode/>
      </div>
    </div>
  </>
}

export default MobileMenu;