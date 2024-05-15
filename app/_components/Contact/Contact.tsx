'use client'

import useFirestore from "@/app/_hooks/useFirestore";
import { isMobileStateAtom } from "@/app/_store/isMobile";
import { snackbarStateAtom } from "@/app/_store/snackbar";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface EmailFormTypes {
  name: string
  company: string
  contact: string
  content: string
}

const Contact = () => {
  const setSnackbarState = useSetRecoilState(snackbarStateAtom)

  const isMobile = useRecoilValue(isMobileStateAtom)

  const { data:contactLinkList } = useFirestore('contact_link');
  const { data:contactInfoList } = useFirestore('contact_info');

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

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

  return <>
    <div ref={ref} className="flex justify-center">
      <div className="flex items-center md:flex-row flex-col md:h-[70vh] md:max-h-[628px] h-auto sm:w-[90%] w-full md:mb-0 mb-20">
        <div className="relative z-10 md:w-[37%] w-full min-w-[260px] md:h-full rounded-[20px] bg-gradient-to-br from-[#77C9CE] to-[#326366] overflow-hidden flex-shrink-0">
          <div className="w-[14vw] min-w-32 h-[14vw] min-h-32 rounded-full bg-blue-2 absolute top-5 left-[10%]"/>
          <div className="w-[17vw] h-[17vw] rounded-full bg-blue-2 absolute top-[30%] right-[10%]"/>
          <div className="w-full h-full relative top-0 left-0 bg-white bg-opacity-5 backdrop-blur-[60px] px-[14%] py-[10%]">
            <div className="2xl:text-5xl xl:text-4xl text-3xl font-semibold Montserrat tracking-tighter text-white 2xl:mb-[74px] xl:mb-16 lg:mb-14 md:mb-12 mb-10">
              Contact .
            </div>
            <div>
              {contactInfoList.sort((a,b) => a.sort - b.sort).map((info, index) => (
                <div 
                  key={`info-item-${index}`} 
                  className="flex items-center 2xl:mb-4 xl:mb-3 lg:mb-2 md:mb-1 mb-0"
                >
                  <div className="w-5 text-center mr-2">
                    <i className={`${info.icon} 2xl:text-2xl xl:text-xl text-lg text-white`}></i>
                  </div>
                  <button 
                    className="2xl:text-lg xl:text-base text-sm text-white tracking-wide px-2.5 py-1.5 rounded-md hover:bg-blue-4 hover:bg-opacity-20 transition-all"
                    onClick={()=>copyToClipboard(info.label)}
                  >
                    {info.label}
                  </button>
                </div>
              ))}
            </div>
            <hr className="bg-white bg-opacity-40 h-[1px] border-0 xl:my-10 my-8"/>
            <div className="flex justify-evenly">
              {contactLinkList.sort((a, b) => a.sort - b.sort).map((link, index) => (
                <a key={`link-item-${index}`} href={link.link}>
                  <img src={link.icon} className="xl:w-[30px] lg:w-6 w-5 xl:h-[30px] lg:h-6 h-5 mr-2.5 invert"/>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div 
          className={`md:flex-1 w-[90%] md:h-[90%] bg-blue-3 bg-opacity-90 md:rounded-tr-2xl rounded-br-2xl md:rounded-bl-none rounded-bl-2xl 2xl:p-10 xl:p-9 lg:p-8 sm:p-8 md:p-7 px-6 py-8 backdrop-blur-lg ${entry?.intersectionRatio ? (isMobile ? "fade-in-top" : "fade-in-left") : "opacity-0"}`} 
          style={{animationDelay: "0.5s"}}
        >
          <div className="flex justify-center flex-col h-full">
            <div className="Montserrat text-white 2xl:text-3xl xl:text-2xl text-xl xl:mb-1 md:mb-0.5 mb-1">
              Send Email .
            </div>
            <div className="2xl:text-base xl:text-sm text-xs text text-white xl:mb-5 md:mb-4 mb-3">
              궁금한 점이나 제안할 사항이 있다면 <br className="sm:hidden"/>메일을 보내주세요!
            </div>
            <form 
              method="POST" 
              data-email="chltjdnjs529@gmail.com" 
              action="https://script.google.com/macros/s/AKfycbz0gHfepP9cWlpSkXeIuMxqnsD7mg68jyI6m9VKB_rsd6YE_DaZ8NaNURTiWINliFfJmA/exec"
              className="gform"
            >
              <div className="relative flex flex-col">
                <div className="flex justify-between w-full">
                  <input 
                    type="text"
                    name="name" 
                    id="name"
                    placeholder="이름 *"
                    required
                    className={`form-input w-[48.5%]`}
                  />
                  <input 
                    type="text" 
                    name="company"
                    id="company"
                    placeholder="회사명"
                    className={`form-input w-[48.5%]`}
                  />
                </div>
                <input 
                  type="text" 
                  name="contact"
                  id="contact"
                  placeholder="연락처 *"
                  required
                  className={`form-input w-full`}
                />
                <textarea 
                  placeholder="내용 *"
                  name="content"
                  id="content"
                  required
                  className={`form-input w-full`}
                />
                <div className="flex items-center justify-between mt-2">
                  <div 
                    className="thankyou_message text-sm ml-1 text-white"
                    style={{display:"none"}}
                  >
                    성공적으로 전송되었습니다. <br className="sm:hidden"/>감사합니다.
                  </div>
                  <div></div>
                  <button
                    className={`group 2xl:w-[52px] xl:w-12 lg:w-11 w-10 md:hover:w-[166px] 2xl:h-[52px] xl:h-12 lg:h-11 h-10 bg-blue-2 md:hover:brightness-105 active:brightness-105 transition-all duration-200 rounded-full flex items-center justify-center button-shadow hover:px-0`}
                  >
                    <i className="fa-solid fa-paper-plane md:text-lg text-base text-white"></i>
                    <span className="md:group-hover:w-28 w-0 overflow-hidden transition-all whitespace-nowrap text-white">
                      이메일 보내기
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> 
    <style jsx>
      {`
        .form-input {
          flex-shrink: 0;
          height: 34px;
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.2);
          color: #FFF;
          border-radius: 5px;
          padding-left: 8px;
          border: 2px solid;
          border-color: transparent;
          transition: all 0.3s ease;
        }
        @media (min-width: 768px) {
          .form-input {
            height: 36px;
            margin-bottom: 8px;
          }
          .form-input, textarea.form-input {
            padding-left: 10px;
          }
        }
        @media (min-width: 1024px) {
          .form-input {
            height: 38px;
            margin-bottom: 10px;
          }
          .form-input, textarea.form-input {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
        @media (min-width: 1280px) {
          .form-input {
            height: 42px;
            margin-bottom: 14px;
          }
          .form-input, textarea.form-input {
            padding-left: 14px;
            padding-right: 14px;
          }
        }
        @media (min-width: 1536px) {
          .form-input {
            height: 46px;
            margin-bottom: 18px;
          }
          .form-input, textarea.form-input {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        textarea.form-input {
          height: 120px;
          padding-top: 10px;
          padding-right: 10px;
          resize: none;
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .form-input:focus {
          outline: none;
          border-color: #12979F;
          background: rgba(255, 255, 255, 0.25);
        }
        .form-input.error {
          border-color: #12979F;
        }
        .button-shadow {
          box-shadow: 4px 4px 16px 0px rgba(0,0,0,0.15);
        }
        .button-shadow:active {
          box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.15);
        }
      `}
    </style>
    <script data-cfasync="false" type="text/javascript" src="https://cdn.rawgit.com/dwyl/html-form-send-email-via-google-script-without-server/master/form-submission-handler.js"></script>
  </>
}

export default Contact;