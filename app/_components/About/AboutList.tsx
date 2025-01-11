import useFirestore from "@/app/_hooks/useFirestore";
import { isMobileStateAtom } from "@/app/_store/isMobile";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IAboutListItem {
  id: number;
  icon: string;
  title: string;
  content: string;
}

const AboutList = () => {
  const isMobile = useRecoilValue(isMobileStateAtom)

  const {data} = useFirestore("about_list")

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  const [isRendered, setIsRendered] = useState<boolean>(false)

  useEffect(() => {
    if (!isRendered && entry?.intersectionRatio) {
      setIsRendered(true);
    }
  }, [entry?.intersectionRatio])

  return <div ref={ref} className="w-full h-full flex lg:flex-row flex-col items-center justify-between relative mb-12">
    {(data as IAboutListItem[]).sort((a, b) => a.id - b.id).map(item => (
      <div
        key={`about-list-item-${item.id}`}
        className={`lg:w-[27%] w-full xl:after:pb-[100%] lg:after:pb-[130%] md:after:pb-[27%] relative after:block lg:mb-0 mb-8 ${isRendered ? "fade-in-bottom" : "opacity-0"}`}
        style={{
          animationDelay: `${(isMobile ? 0 : 2) + 0.3 * item.id}s`
        }}
      >
        <div className="md:absolute relative w-full h-full rounded-[30px] bg-blue-1 bg-opacity-15 dark:bg-opacity-20 from p-6">
          <div className="flex items-center">
            <div className="lg:w-1/4 w-[60px] after:pb-[100%] relative after:block flex-shrink-0">
              <div className="absolute w-full h-full rounded-full bg-blue-1 dark:bg-blue-4 bg-opacity-25 dark:bg-opacity-20 flex items-center justify-center">
                <img src={item.icon} className="w-3/5 dark:invert" />
              </div>
            </div>
            <div className="2xl:ml-5 ml-3 2xl:text-2xl xl:text-xl text-lg Montserrat">
              {item.title}
            </div>
          </div>
          <div 
            className="about-list-content 2xl:mt-6 lg:mt-5 mt-4 lg:text-base text-sm" 
            style={{lineHeight: 1.6}}
          >
            <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        </div>
      </div>
    ))}
  </div>
}

export default AboutList;