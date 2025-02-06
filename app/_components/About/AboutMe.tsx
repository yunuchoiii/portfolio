import useFirestore from "@/app/_hooks/useFirestore";

interface IAboutMe {
  title: string
  content: string
}

const AboutMe = ({entry}:{entry: IntersectionObserverEntry | null}) => {
  const {data} = useFirestore("about_me")
  const aboutMe = data[0] as IAboutMe || {title: "", content: ""}

  return <div className="w-full h-full flex lg:flex-row flex-col justify-between relative mb-16">
    <div className="lg:w-3/12">
      <h1 
        className={`Montserrat font-bold tracking-tight 2xl:text-7xl xl:text-6xl text-5xl ${entry?.intersectionRatio ? "tracking-in-expand" : "opacity-0"}`}
      >
        About <br/>
        Me <b className="text-blue-1">.</b>
      </h1>
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
      <p className="text-lg mb-3 font-semibold">
        {aboutMe.title}
      </p>
      <div 
        dangerouslySetInnerHTML={{__html: aboutMe.content}} 
        className="about-me-content leading-relaxed text-base space-y-2"
      />
    </div>
  </div>
}

export default AboutMe;