const AboutMe = ({entry}:{entry: IntersectionObserverEntry | null}) => {

  return <div className="w-full h-full flex lg:flex-row flex-col justify-between relative mb-16">
    <div className="lg:w-3/12">
      <div 
        className={`Montserrat font-bold tracking-tight 2xl:text-7xl xl:text-6xl text-5xl ${entry?.intersectionRatio ? "tracking-in-expand" : "opacity-0"}`}
      >
        About <br/>
        Me <b className="text-blue-1">.</b>
      </div>
    </div>
    <div 
      className={`
        lg:w-8/12 mt-8 lg:mt-0
        ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}
      `}
      style={{
        animationDelay: "1s",
        lineHeight: 1.8,
      }}
    >
      <p className="text-lg mb-2 font-semibold">
        안녕하세요. 트렌디한 개발자 최서원입니다.
      </p>
      <div className="leading-relaxed text-base ">
        안녕하세요. 3년차 프론트엔드 개발자 최서원입니다.
        저는 2022년 7월 개발자 교육과정에서 처음으로 개발을 시작해 교육 수료 후 곧바로 첫 회사에 취업하여 지금까지 일해오고 있습니다.<br/>
        여러 프로젝트에서 Vue 와 React(Next.js)를 이용하여 작업한 만큼 SPA 프레임워크에 익숙하며 Recoil, VueX와 같은 상태관리 라이브러리 또한 이용해본 경험이 있습니다. 이에 더해, UX/UI에 대한 깊은 관심을 바탕으로, 사용자 친화적인 경험을 제공하기 위해 노력하고 있습니다. 저는 코드에 대한 지속적인 회고를 통해 트렌디하고 쾌적한 서비스개발을 목표로 하고 있습니다.        
      </div>
    </div>
  </div>
}

export default AboutMe;