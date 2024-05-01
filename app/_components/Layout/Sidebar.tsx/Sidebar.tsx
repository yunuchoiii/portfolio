import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/_constants";
import { CONTACT_INFO } from "@/app/_constants/contact";
import IconButton from "../../Button/IconButton";
import DarkMode from "../Header/DarkMode";

const Sidebar = () => {
  return <div 
    className="fixed z-50 h-screen border-r border-blue-1 flex flex-col items-center justify-between pb-8"
    style={{width:SIDEBAR_WIDTH}}
  >
    <div
      className="flex items-center justify-center"
      style={{height: HEADER_HEIGHT}}
    >
      <img src="/images/main/logo_white.png" className="w-2/5 hidden dark:block"/>
      <img src="/images/main/logo_black.png" className="w-2/5 block dark:hidden"/>
    </div>
    <div>
      <IconButton>
        <img src="/images/icons/plus.png" className="opacity-80" />
      </IconButton>
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
}

export default Sidebar;