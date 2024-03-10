'use client';

import { HEADER_HEIGHT } from "@/app/_constants";
import { CONTACT_INFO } from "@/app/_constants/contact";
import { MENU_MAP } from "@/app/_constants/menu";
import { useEffect, useState } from "react";
import IconButton from "../../Button/IconButton";
import DarkMode from "./DarkMode";

const Header = () => {

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    document.querySelectorAll(".scroll-area").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMenuClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <div
    id="header"
    className={`fixed top-0 w-screen flex items-center justify-between px-[50px] Montserrat tracking-tighter font-light z-50 backdrop-blur`}
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
      {MENU_MAP.map(i => {
        return <button
          key={`menu-item-${i.index}`}
          className={`${i.title == activeSection ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity tracking-tighter`}
          onClick={()=>handleMenuClick(i.title)}
        >
          {i.title}
        </button>
      })}
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