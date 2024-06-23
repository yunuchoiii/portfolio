import { HEADER_HEIGHT } from "@/app/_constants"
import { activeSectionAtom } from "@/app/_store/activeSection"
import { isMobileStateAtom } from "@/app/_store/isMobile"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

interface PageProps {
  id: string
  title?: string
  children: React.ReactNode
  longPage?: boolean
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const FullPage = ({id, title, children, longPage, props}:PageProps) => {
  const isMobile = useRecoilValue(isMobileStateAtom)

  const setActiveSection = useSetRecoilState(activeSectionAtom);

  const [ref, entry] = useIntersectionObserver({
    threshold: (isMobile && longPage) ? 0.1 : 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setActiveSection(id);
    }
  }, [entry?.isIntersecting, id, setActiveSection]);
  
  return (
    <div 
      id={id}
      ref={ref}
      className={`relative ${!isMobile ? "scroll-area min-h-dvh" : ""} ${!longPage ? 'h-full ' : ""}`}
      style={{
        paddingTop: isMobile ? HEADER_HEIGHT : (longPage ? HEADER_HEIGHT + 30 : HEADER_HEIGHT/2), 
        paddingBottom: isMobile ? 0 : (longPage ? HEADER_HEIGHT : 0)
      }}
      {...props}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="2xl:w-[1296px] xl:w-[1080px] lg:w-[864px] md:w-[648px] sm:w-[560px] w-[calc(100%-60px)]">
          {title && (
            <div className="relative w-fit Montserrat text-3xl font-semibold mb-[50px]">
              {title}
              <div className={`absolute bottom-0 -left-[3%] -z-10 ${entry?.intersectionRatio ? "w-[106%]" : "w-0"} h-5 bg-blue-1 bg-opacity-50 dark:bg-opacity-75 transition-all duration-700`}></div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default FullPage;