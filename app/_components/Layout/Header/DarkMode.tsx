"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface IDarkMode {}

function DarkMode({}: IDarkMode) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light")
    }
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return <button
    className="relative w-[75px] h-[30px] rounded-full border-[3px] border-blue-1 flex items-center blue-shadow-1"
    onClick={onClick}
  >
    <div
      className="w-[43.5px] h-[22px] rounded-full bg-blue-2 absolute z-0 transition-all"
      style={{
        left: theme === "light" ? '1px' : '24px',
      }}
    ></div>
    <div className="w-full flex items-center justify-between relative z-10">
      <img src="/images/header/darkmode_sun.png" className="w-[18px] h-[18px] ml-1"></img>
      <div className="w-1 h-1 rounded-sm bg-[#FFFDFD]"></div>
      <img src="/images/header/darkmode_moon.png" className="w-[18px] h-[18px] mr-1"></img>
    </div>
  </button>;
}

export default DarkMode;