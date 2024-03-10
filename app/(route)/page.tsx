import { DetailedHTMLProps, HTMLAttributes } from "react";
import About from "../_components/About/About";
import Home from "../_components/Home/Home";
import Skills from "../_components/Skills/Skills";
import { HEADER_HEIGHT } from "../_constants";

export default function Main() {

  interface PageProps {
    id: string
    title?: string
    children: React.ReactNode
    props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }

  const Page = ({id, title, children, props}:PageProps) => {
    return (
      <div 
        id={id}
        className="min-h-screen scroll-area"
        style={{paddingTop: HEADER_HEIGHT}}
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

  return (
    <div className="relative scroll-container h-screen">
      <Page id="Home">
        <Home/>
      </Page>
      <Page id="About" title="About">
        <About/>
      </Page>
      <Page id="Skills" title="Skills">
        <Skills/>
      </Page>
    </div>
  );
}
