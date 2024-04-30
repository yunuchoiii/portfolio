import useFirestore from "@/app/_hooks/useFirestore";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import IconButton from "../Button/IconButton";

const AboutContact = () => {

  const { data:contactLinkList } = useFirestore('contact_link');

  const contactInfoList = [
    {
      "id": "hYmXrPqZBvEDQSYG2L05",
      "icon": "/images/icons/mail.png",
      "label": "chltjdnjs529@gmail.com",
    },
    {
      "id": "YlCOg0sSgzTqLALKtGWi",
      "icon": "/images/icons/phone.png",
      "label": "010-4118-8180",
    },
  ]

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다: ' + text);
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

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return <div 
    ref={ref} 
    className={`w-full h-28 flex items-center justify-between relative mb-16 border-[1px] border-blue-1 blue-shadow-2 rounded-[30px] px-6 py-4 ${entry?.intersectionRatio ? "fade-in" : "opacity-0"}`}
    style={{animationDelay: "0.9s"}}
  >
    <AboutContactSection>
      <div className="flex flex-col justify-center w-full">
        {contactInfoList.map((info, index) => (
          <div 
            key={`info-item-${index}`}
            className="flex items-center w-fit rounded-md px-2 py-1 mb-1 last:mb-0 hover:bg-blue-4 hover:bg-opacity-20 transition-all cursor-pointer"
            onClick={()=>copyToClipboard(info.label)}
          >
            <img src={info.icon} className="2xl:w-6 lg:w-5 w-4 2xl:h-6 lg:h-5 h-4 mr-3"/>
            <span className="2xl:text-lg xl:text-base text-sm text-white tracking-wide Montserrat">
              {info.label}
            </span>
          </div>
        ))}
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