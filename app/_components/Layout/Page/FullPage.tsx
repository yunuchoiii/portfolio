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
      className={`min-h-screen scroll-area ${!longPage && 'h-full'}`}
      style={{
        paddingTop: longPage ? HEADER_HEIGHT + 30 : HEADER_HEIGHT/2, 
        paddingBottom: longPage ? HEADER_HEIGHT : 0
      }}
      {...props}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="2xl:w-[1336px] xl:w-[1080px] lg:w-[824px] md:w-[568px]">
          {title && (
            <div className="Montserrat 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg font-semibold mb-[50px]">
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