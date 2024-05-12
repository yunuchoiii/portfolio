import { useIntersectionObserver } from "@uidotdev/usehooks";
import AboutCareer from "./AboutCareer";
import AboutContact from "./AboutContact";
import AboutList from "./AboutList";
import AboutMe from "./AboutMe";

const About = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div ref={ref}>
    <AboutMe entry={entry}/>
    <AboutContact entry={entry}/>
    <AboutList/>
    <AboutCareer/>
  </div>
}

export default About;