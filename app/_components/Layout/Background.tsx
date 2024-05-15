"use client";

import { FIRST_LOADING_TIME_MS } from "@/app/_constants";
import { isRenderingStateAtom } from "@/app/_store/isRendering";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import BarLoader from "../Loader/BarLoader";

const Background = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  const [isRendering, setIsRendering] = useRecoilState(isRenderingStateAtom)

  useEffect(() => {
    setTimeout(() => {
      setIsRendering(false)
    }, FIRST_LOADING_TIME_MS)
  }, [])

  return <div ref={ref} className={`fixed w-screen h-dvh ${isRendering ? "z-50" : "-z-10"}`}>
    <img src="/images/main/home-bg-light.png" className={`block dark:hidden w-full h-full object-top object-cover transition-all duration-[2s] ${entry?.intersectionRatio ? "scale-100" : "scale-[2]"}`}/>
    <img src="/images/main/home-bg-dark.png" className={`hidden dark:block w-full h-full object-top object-cover transition-all duration-[2s] ${entry?.intersectionRatio ? "scale-100" : "scale-[2]"}`}/>
    {isRendering && <div className="absolute top-0 left-0 z-[60] w-full h-full flex items-center justify-center">
      <BarLoader/>
    </div>}
  </div>
}

export default Background;