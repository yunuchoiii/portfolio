'use client'

import { isRenderingStateAtom } from "@/app/_store/isRendering";
import Image from "next/image";
import { useRecoilValue } from "recoil";

type ButtonProps = {
  title: string;
  onClick: () => void;
  className: string;
}

const Button = ({ title, onClick, className }: ButtonProps) => (
  <button
    title={title}
    onClick={onClick}
    className={`h-[50px] px-[30px] rounded-full md:text-lg text-base font-semibold uppercase Montserrat ${className}`}
  >
    {title.toLowerCase()}
  </button>
)

const Home = () => {
  const isRendering = useRecoilValue(isRenderingStateAtom)

  const handleButton = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }
  
  const buttonVariants = {
    primary: "bg-gradient-to-r from-blue-4 to-blue-1 text-white dark:text-[#172026] hover:brightness-95 active:brightness-90",
    secondary: "border-2 dark:border-blue-4 border-blue-1 dark:text-blue-4 text-blue-1 hover:bg-blue-4 hover:bg-opacity-10 active:bg-blue-4 active:bg-opacity-20"
  }

  return <>
    <section 
      id="home"
      className={`relative w-full md:h-[64vh] flex flex-col-reverse md:flex-row items-center justify-center Montserrat overflow-hidden gap-8 md:gap-12 xl:gap-16 ${isRendering ? "opacity-0" : "fade-in"}`}
    >
      <div className="flex flex-col">
        <h2 
          className={`2xl:text-[40px] lg:text-[35px] text-[28px] font-bold mb-5 ${isRendering ? "opacity-0" : "tracking-in-expand"}`}
        >
          Hello. I am <br/>
        </h2>
        <h1 
          className={`2xl:text-[96px] lg:text-[80px] text-[54px] font-bold leading-[90%] tracking-tight mb-[50px] -ml-1 ${isRendering ? "opacity-0" : "tracking-in-expand"}`}
          style={{
            animationDelay: "1.5s"
          }}
        >
          <span className="text-blue-1 dark:text-blue-4">Front</span>end <br/>
          Developer
        </h1>
        <p 
          className={`2xl:text-[24px] lg:text-[20px] text-[16px] font-light leading-[160%] mb-[30px] tracking-tight ${isRendering ? "opacity-0" : "tracking-in-expand"}`}
          style={{
            animationDelay: "2.5s"
          }}
        >
          안녕하세요. <br/>
          프론트엔드 개발자 최서원입니다.
        </p>
          <nav 
          className={`flex gap-5 ${isRendering ? "opacity-0" : "fade-in"}`}
          style={{
            animationDelay: "3s"
          }}
        >
          <Button
            title="More"
            onClick={() => handleButton("About")}
            className={buttonVariants.primary}
          />
          <Button
            title="Contact"
            onClick={() => handleButton("Contact")}
            className={buttonVariants.secondary}
          />
        </nav>
      </div>
      <div className="relative md:w-[28vw] w-[280px] md:h-[28vw] h-[280px] md:min-w-[300px] md:min-h-[300px] max-w-[450px] max-h-[450px] xl:p-5 md:p-3.5 p-2.5 border border-blue-4 rounded-full">
        <div className="relative w-full h-full overflow-hidden rounded-full">
          <Image
            src={"/images/main/home-ide-shot.png"}
            alt="Home"
            fill
            priority
            sizes="100%"
            className={`object-cover rounded-full hover:scale-110 transition-all duration-[2s] ${isRendering ? "scale-150" : "scale-100"}`}
          />
        </div>
      </div>
    </section>
  </>
}

export default Home;