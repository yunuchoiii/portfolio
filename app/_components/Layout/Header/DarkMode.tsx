"use client";

import { useTheme } from "next-themes";

const DarkMode = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const onClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light")
    }
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return <button
    className="relative h-[75px] w-[31px] rounded-full border-[3px] border-blue-1 flex items-center blue-shadow-1"
    onClick={onClick}
  >
    <div
      className="h-[41px] w-[22px] rounded-full bg-blue-2 absolute z-0 transition-all left-[1.5px]"
      style={{
        top: currentTheme === "light" ? '1.5px' : '26.5px',
      }}
    ></div>
    <div className="w-full flex flex-col items-center justify-between relative z-10">
      <img src="/images/header/darkmode_sun.png" className="w-[18px] h-[18px] mb-2.5"></img>
      <div className="w-1 h-1 rounded-md bg-[#FFFDFD]"></div>
      <img src="/images/header/darkmode_moon.png" className="w-[18px] h-[18px] mt-2.5"></img>
    </div>
  </button>;
}

export default DarkMode;