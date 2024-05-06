'use client'

import { useIntersectionObserver } from "@uidotdev/usehooks";

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

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div ref={ref}>
    <div className="w-full h-[70vh] flex flex-col justify-end relative z-30 Montserrat">
      <div className="2xl:text-[40px] xl:text-3xl lg:text-2xl text-xl font-bold lg:mb-5 md:mb-4 mb-3">
        Hello. I am <br/>
      </div>
      <div className={`2xl:text-[112px] xl:text-[90px] lg:text-[75px] text-[60px] font-bold leading-[90%] lg:mb-12 md:mb-10 mb-8 -ml-1`}>
        <span className="text-blue-1 dark:text-blue-4">Front</span>end<br/>
        Developer
        <span className="text-blue-4">&nbsp;.</span>
      </div>
      <div className="Pretendard 2xl:text-2xl xl:text-xl text-lg">
        안녕하세요. 트렌디한 개발자, 최서원입니다.
      </div>
      <div className="w-full flex flex-col items-center">
        <button 
          className="flex flex-col items-center mt-20 -mb-10"
          onClick={()=>handleButton("About")}
        >
          <span className="Montserrat mb-2.5">MORE</span>
          <i className="fa-solid fa-chevron-down text-lg"></i>
        </button>
      </div>
    </div>
  </div>

  // return <div ref={ref} className="flex items-center justify-center sm:flex-row flex-col-reverse Montserrat h-screen">
  //   <div className="tracking-tight sm:mr-[5vw] mr-0 sm:mt-0 mt-10">
  //     <div className="2xl:text-[40px] xl:text-3xl lg:text-2xl text-xl font-bold lg:mb-5 md:mb-4 mb-3">
  //       Hello. I am <br/>
  //     </div>
  //     <div className={`2xl:text-[96px] xl:text-[70px] lg:text-[55px] text-[40px] font-bold leading-[90%] lg:mb-12 md:mb-10 mb-8 ${entry?.intersectionRatio ? "text-focus-in" : "opacity-0"}`}>
  //       <span className="text-blue-4">Front</span>end<br/>
  //       Developer
  //     </div>
  //     <div className="2xl:text-xl xl:text-lg lg:text-md text-base lg:mb-[30px] md:mb-6 mb-5">
  //       안녕하세요. <br/>
  //       프론트엔드 개발자 최서원입니다.
  //     </div>
  //     <div className="flex">
  //       {buttonList.map((item, index) => {
  //         return <button
  //           key={`main-button-item-${index}`}
  //           className={`md:px-7 md:py-2 px-5 py-1 rounded-full 2xl:text-xl xl:text-lg lg:text-md md:text-base text-sm font-semibold tracking-tighter uppercase mr-5 last:mr-0 button-hover-shadow transition-shadow ${item.className}`}
  //           onClick={item.onClick}
  //         >
  //           {item.title}
  //         </button>
  //       })}
  //     </div>
  //   </div>
  //   <div className="md:w-[40%] sm:w-[50%] w-[250px] after:pb-[100%] relative after:block">
  //     <div className="absolute w-full h-full rounded-full border-[1px] border-blue-4 p-[4%]">
  //       <img src="/images/main/main-img.png" className="w-full h-full rounded-full"/>
  //     </div>
  //   </div>
  // </div>
}

export default Home;