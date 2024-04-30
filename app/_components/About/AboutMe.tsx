const AboutMe = ({entry}:{entry: IntersectionObserverEntry | null}) => {

  return <div className="w-full h-full flex items-center justify-between relative mb-16">
    <div className="w-3/12">
      <div 
        className={`Montserrat font-bold tracking-tight 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl ${entry?.intersectionRatio ? "tracking-in-expand" : "opacity-0"}`}
      >
        About <br/>
        Me <b className="text-blue-1">.</b>
      </div>
    </div>
    <div 
      className={`
        w-8/12 2xl:text-lg xl:text-md lg:text-base text-sm
        ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}
      `}
      style={{
        animationDelay: "1s",
        lineHeight: 1.8,
      }}
    >
      안녕하세요, 트렌디한 프론트엔드 개발자 최서원입니다. <br/>
      사용자 중심의 UX/UI 디자인에 깊은 관심을 갖고, 현대적이며 사용자 친화적인 서비스 개발을 추구하고 있습니다. <br/>
      또한 지속적인 코드 회고와 다양한 학습 환경을 통해 더 효율적인 코딩을 하기 위해 항상 노력하고 있습니다.
    </div>
  </div>
}

export default AboutMe;