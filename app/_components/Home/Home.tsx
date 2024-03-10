'use client'

import { HEADER_HEIGHT } from "@/app/_constants";

const Home = () => {

  const handleButton = (sectionId:string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  interface buttonProps {
    title: string
    className: string
    onClick: () => void
  }

  const buttonList:buttonProps[] = [
    {
      title: "more",
      className: "bg-gradient-to-r from-blue-4 to-blue-2 text-[#F2FAFF] dark:text-[#172026]",
      onClick: () => handleButton('About')
    },
    {
      title: "contact",
      className: "text-blue-4 border-2 border-blue-4",
      onClick: () => handleButton('Contact')
    },
  ]

  return <div 
    className="flex items-center justify-center Montserrat h-screen"
    style={{
      marginTop: `-${HEADER_HEIGHT}px`
    }}
  >
    <div className="tracking-tight mr-[5vw]">
      <div className="2xl:text-[40px] xl:text-3xl lg:text-2xl md:text-xl font-bold mb-5">
        Hello. I am <br/>
      </div>
      <div className="2xl:text-[96px] xl:text-[70px] lg:text-[55px] md-text-[40px] font-bold leading-[90%] mb-12">
        <span className="text-blue-4">Front</span>end<br/>
        Developer
      </div>
      <div className="2xl:text-xl xl:text-lg lg:text-md md:text-base mb-[30px]">
        안녕하세요. <br/>
        프론트엔드 개발자 최서원입니다.
      </div>
      <div className="flex">
        {buttonList.map((item, index) => {
          return <button
            key={`main-button-item-${index}`}
            className={`px-[30px] py-2 rounded-full 2xl:text-xl xl:text-lg lg:text-md md:text-base font-semibold tracking-tighter uppercase mr-5 button-hover-shadow transition-shadow ${item.className}`}
            onClick={item.onClick}
          >
            {item.title}
          </button>
        })}
      </div>
    </div>
    <div className="2xl:w-[400px] 2xl:h-[400px] w-[360px] h-[360px] rounded-full border-[1px] border-blue-4 2xl:p-6 p-5">
        <img src="/images/main/main-img.png" className="w-full h-full rounded-full"/>
    </div>
  </div>
}

export default Home;