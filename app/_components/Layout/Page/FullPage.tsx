import { HEADER_HEIGHT } from "@/app/_constants"
import { DetailedHTMLProps, HTMLAttributes } from "react"

interface PageProps {
  id: string
  title?: string
  children: React.ReactNode
  longPage?: boolean
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const FullPage = ({id, title, children, longPage, props}:PageProps) => {
  return (
    <div 
      id={id}
      className={`relative min-h-screen scroll-area ${!longPage && 'h-full'}`}
      style={{
        paddingTop: longPage ? HEADER_HEIGHT + 30 : HEADER_HEIGHT/2, 
        paddingBottom: longPage ? HEADER_HEIGHT : 0
      }}
      {...props}
    >
      {id !== "Home" && <div className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-[0.01] 2xl:backdrop-blur-[750px] lg:backdrop-blur-[55px] sm:backdrop-blur-[45px] backdrop-blur-[35px] 2xl:dark:backdrop-blur-[100px] lg:dark:backdrop-blur-[75px] sm:dark:backdrop-blur-[57px] dark:backdrop-blur-[40px] -z-10"/>}
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