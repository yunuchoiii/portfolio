import { DetailedHTMLProps, HTMLAttributes } from "react";
import About from "../_components/About/About";
import Home from "../_components/Home/Home";

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
        className="h-full min-h-screen scroll-area"
        {...props}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-[1100px]">
            {title && (
              <div className="Montserrat 2xl:text-3xl text-2xl font-semibold">
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
    </div>
  );
}
