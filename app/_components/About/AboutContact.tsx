import useFirestore from "@/app/_hooks/useFirestore";
import { snackbarStateAtom } from "@/app/_store/snackbar";
import { useSetRecoilState } from "recoil";
import IconButton from "../Button/IconButton";

const AboutContact = ({entry}:{entry: IntersectionObserverEntry | null}) => {
  const setSnackbarState = useSetRecoilState(snackbarStateAtom)

  const { data:contactLinkList } = useFirestore('contact_link');
  const { data:contactInfoList } = useFirestore('contact_info');

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarState({
        open: true,
        message: "클립보드에 복사되었습니다"
      })
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  };

  const resumeButtons = [
    {
      href: "https://my.surfit.io/w/1787096965",
      icon: "fa-link",
    },
    {
      href: "https://1drv.ms/b/s!AvXh3xzvn6bxjfxleKHf8jxJtztVwg?e=LQWjgY",
      icon: "fa-cloud-arrow-down",
    }
  ];

  const AboutContactSection = ({children, last}:{children?:any, last?:boolean}) => {
    return <div className="relative w-full h-full flex items-center justify-center md:mb-0 mb-3 last:mb-0 md:p-0 py-2 px-3 md:bg-transparent bg-blue-1 bg-opacity-20 dark:bg-blue-30 rounded-[20px]">
      {children}
      <div className={`${last ? "w-0" : "md:w-[1px] w-0"} h-full bg-blue-1 blue-shadow-1 absolute right-0`}/>
    </div>
  }

  return <div 
    className={`w-full md:h-28 h-auto flex md:flex-row flex-col items-center justify-between relative mb-16 border-[1px] border-blue-1 blue-shadow-2 rounded-[30px] lg:px-6 px-4 py-4 ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}`}
    style={{animationDelay: "1s"}}
  >
    <AboutContactSection>
      <div className="flex flex-col justify-center w-full">
        {contactInfoList.sort((a,b) => a.sort - b.sort).map((info, index) => {
          return info.sort !== 2 && <div 
            key={`info-item-${index}`}
            className="flex items-center w-fit rounded-lg px-2 py-1 mb-1 last:mb-0 hover:bg-blue-4 hover:bg-opacity-20 cursor-pointer transition-[background-color]"
            onClick={()=>copyToClipboard(info.label)}
          >
            <i className={`${info.icon} lg:mr-3 mr-2 2xl:text-xl xl:text-lg text-base`}></i>
            <span className="2xl:text-lg xl:text-base text-sm tracking-wide Montserrat">
              {info.label}
            </span>
          </div>
        })}
      </div>
    </AboutContactSection>
    <AboutContactSection>
      <div className="flex justify-between lg:w-1/2 w-2/3 ">
        {contactLinkList.map((link, index) => {
          return <IconButton key={`info-link-${index}`}>
            <a href={link.link} target="_blank">
              <img src={link.icon} />
            </a>
          </IconButton>
        })}
      </div>
    </AboutContactSection>
    <AboutContactSection last>
      <div className="flex items-center justify-evenly w-full pl-3">
        <div className="2xl:text-xl lg:text-lg text-base tracking-tighter Montserrat">
          RESUME
        </div>
        <div className="xl:w-[100px] lg:w-[90px] w-[80px] flex justify-between">
          {resumeButtons.map((button, index) => (
            <a 
              key={`resume-button-${index}`}
              href={button.href}
              target="_blank"
              className="w-10 h-10 p-2 rounded-full hover:bg-blue-1 hover:bg-opacity-30 transition-all flex items-center justify-center"
            >
              <i className={`fa-solid ${button.icon} text-xl`}></i>
            </a>
          ))}
        </div>
      </div>
    </AboutContactSection>
  </div>
}

export default AboutContact;