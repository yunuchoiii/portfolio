const Home = () => {
  
  interface buttonProps {
    title: string
    className: string
  }

  const buttonList:buttonProps[] = [
    {
      title: "more",
      className: "bg-gradient-to-r from-blue-4 to-blue-2 text-[#F2FAFF] dark:text-[#172026]"
    },
    {
      title: "contact",
      className: "text-blue-4 border-2 border-blue-4"
    },
  ]

  return <div className="flex items-center justify-between Montserrat">
    <div className="mr-[100px] tracking-tight">
      <div className="2xl:text-[40px] text-3xl font-bold mb-5">
        Hello. I am <br/>
      </div>
      <div className="2xl:text-[96px] text-[70px] font-bold leading-[90%] mb-12">
        <span className="text-blue-4">Front</span>end<br/>
        Developer
      </div>
      <div className="2xl:text-xl text-lg mb-[30px]">
        안녕하세요. <br/>
        프론트엔드 개발자 최서원입니다.
      </div>
      <div className="flex">
        {buttonList.map((item, index) => {
          return <button
            key={`main-button-item-${index}`}
            className={`px-[30px] py-2 rounded-full 2xl:text-xl text-lg font-semibold tracking-tighter uppercase mr-5 button-hover-shadow transition-shadow ${item.className}`}
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