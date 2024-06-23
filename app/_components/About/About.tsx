import { isMobileStateAtom } from "@/app/_store/isMobile";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useRecoilValue } from "recoil";
import AboutCareer from "./AboutCareer";
import AboutContact from "./AboutContact";
import AboutList from "./AboutList";
import AboutMe from "./AboutMe";

const About = () => {
  const isMobile = useRecoilValue(isMobileStateAtom)
  
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div ref={ref} className={`${isMobile ? "mt-20" : ""}`}>
    <AboutMe entry={entry}/>
    <AboutContact entry={entry}/>
    <AboutList/>
    <AboutCareer/>
  </div>
}

export default About;