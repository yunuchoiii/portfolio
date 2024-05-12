import { HEADER_HEIGHT } from "@/app/_constants"
import { activeSectionAtom } from "@/app/_store/activeSection"
import { useIntersectionObserver, useWindowSize } from "@uidotdev/usehooks"
import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react"
import { useSetRecoilState } from "recoil"

interface PageProps {
  id: string
  title?: string
  children: React.ReactNode
  longPage?: boolean
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const FullPage = ({id, title, children, longPage, props}:PageProps) => {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width! <= 768

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
      className={`relative min-h-screen ${!isMobile && "scroll-area"} ${!longPage && 'h-full'}`}
      style={{
        paddingTop: longPage ? HEADER_HEIGHT + 30 : HEADER_HEIGHT/2, 
        paddingBottom: longPage ? HEADER_HEIGHT : 0
      }}
      {...props}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="2xl:w-[1296px] xl:w-[1080px] lg:w-[864px] md:w-[648px] sm:w-[560px] w-[calc(100%-60px)]">
          {title && (
            <div className="Montserrat 2xl:text-3xl xl:text-2xl text-xl font-semibold mb-[50px]">
              {title}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default FullPage;