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

  const AboutContactSection = ({children, last}:{children?:any, last?:boolean}) => {
    return <div className="relative w-1/3 h-full flex items-center justify-center">
      {children}
      {!last && <div className="w-[1px] h-full bg-blue-1 blue-shadow-1 absolute right-0"/>}
    </div>
  }

  return <div 
    className={`w-full h-28 flex items-center justify-between relative mb-16 border-[1px] border-blue-1 blue-shadow-2 rounded-[30px] px-6 py-4 ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}`}
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
            <img src={info.icon} className="2xl:w-6 lg:w-5 w-4 2xl:h-6 lg:h-5 h-4 mr-3 invert dark:invert-0"/>
            <span className="2xl:text-lg xl:text-base text-sm tracking-wide Montserrat">
              {info.label}
            </span>
          </div>
        })}
      </div>
    </AboutContactSection>
    <AboutContactSection>
      <div className="flex justify-between w-1/2 ">
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
      <div className="flex items-center justify-between w-full pl-12 pr-6">
        <div className="2xl:text-xl lg:text-lg text-base tracking-tighter Montserrat">
          RESUME
        </div>
        <div className="w-[85px] flex justify-between">
          <IconButton>
            <a href="https://my.surfit.io/w/1787096965" target="_blank">
              <img src="/images/icons/link.png" />
            </a>
          </IconButton>
          <IconButton>
            <a href="https://1drv.ms/b/s!AvXh3xzvn6bxjfMDyo3W14z2cZcRJw?e=9T4pWm" target="_blank">
              <img src="/images/icons/download.png" />
            </a>
          </IconButton>
        </div>
      </div>
    </AboutContactSection>
  </div>
}

export default AboutContact;