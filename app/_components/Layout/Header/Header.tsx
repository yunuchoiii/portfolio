import { HEADER_HEIGHT } from "@/app/_constants";
import { CONTACT_INFO } from "@/app/_constants/contact";
import { MENU_MAP } from "@/app/_constants/menu";
import IconButton from "../../Button/IconButton";
import DarkMode from "./DarkMode";

const Header = () => {
  return <div
    id="header"
    className={`fixed top-0 w-screen flex items-center justify-between px-[50px] Montserrat tracking-tighter font-light z-50`}
    style={{height: HEADER_HEIGHT}}
  >
    <div id="logo" className="2xl:text-2xl text-xl">
      <span>
        Seowon Choi
      </span>
      <span className="font-black text-blue-1">
        &nbsp;.
      </span>
    </div>
    <div className="w-1/3 min-w-96 flex items-center justify-between 2xl:text-xl text-lg">
      {MENU_MAP.map(i => (
        <button
          key={`menu-item-${i.index}`}
          className="opacity-50 hover:opacity-100 transition-opacity tracking-tighter"
        >
          {i.title}
        </button>
      ))}
    </div>
    <div className="flex items-center">
      <IconButton
        props={{
          className: "mr-7"
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

export default Header;