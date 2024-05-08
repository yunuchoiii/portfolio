"use client";

import { useIntersectionObserver } from "@uidotdev/usehooks";

const Background = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div ref={ref} className="fixed w-screen h-screen -z-10">
    <img src="/images/main/home-bg-light.png" className={`block dark:hidden w-full h-full object-top object-cover transition-all duration-[2s] ${entry?.intersectionRatio ? "scale-100" : "scale-[2]"}`}/>
    <img src="/images/main/home-bg-dark.png" className={`hidden dark:block w-full h-full object-top object-cover transition-all duration-[2s] ${entry?.intersectionRatio ? "scale-100" : "scale-[2]"}`}/>
  </div>
}

export default Background;