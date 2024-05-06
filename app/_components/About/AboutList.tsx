interface IAboutListItem {
  id: number;
  icon: string;
  title: string;
  content: string;
}

const AboutList = ({entry}:{entry: IntersectionObserverEntry | null}) => {

  const list:IAboutListItem[] = [
    {
      id: 0,
      icon: "/images/icons/frontend.png",
      title: "Multiple SPA Experiences",
      content: "React, Next.js, Vue, Recoil, VueX 등의 다양한 프론트엔드 프레임워크와 상태 관리 라이브러리를 숙련되게 사용하여 다양한 프로젝트 환경에 빠르게 적응할 수 있는 역량을 갖추고 있습니다."
    },
    {
      id: 1,
      icon: "/images/icons/uxui.png",
      title: "UX·UI Sense",
      content: "UX·UI 디자인에 깊은 관심과 감각을 갖추고 있으며, 직관적이고 사용자 친화적인 인터페이스 개발에 집중합니다. 디자이너의 손길이 미처 닿지 않는 부분에서 사용자의 편의성을 높이기 위해 노력합니다."
    },
    {
      id: 2,
      icon: "/images/icons/cooperation.png",
      title: "Cooperation Skills",
      content: "프로젝트의 초기 단계에서 전체 아키텍처 설계에 참여하고, 디자이너·백엔드 개발자들을 비롯한 팀원들과의 협업을 통해 프로젝트를 성공적으로 이끌었습니다. "
    },
  ]

  return <div className="w-full h-full flex lg:flex-row flex-col items-center justify-between relative">
    {list.map(item => (
      <div
        key={`about-list-item-${item.id}`}
        className={`lg:w-[27%] w-full xl:after:pb-[100%] lg:after:pb-[130%] md:after:pb-[27%] relative after:block lg:mb-0 mb-8 ${entry?.intersectionRatio ? "fade-in-bottom" : "opacity-0"}`}
        style={{
          animationDelay: `${2 + 0.3 * item.id}s`
        }}
      >
        <div className="md:absolute relative w-full h-full rounded-[30px] bg-blue-1 bg-opacity-20 from p-6">
          <div className="flex items-center">
            <div className="lg:w-1/4 w-[60px] after:pb-[100%] relative after:block flex-shrink-0">
              <div className="absolute w-full h-full rounded-full bg-blue-2 dark:bg-blue-4 bg-opacity-30 dark:bg-opacity-20 flex items-center justify-center">
                <img src={item.icon} className="w-3/5 dark:invert" />
              </div>
            </div>
            <div className="2xl:ml-5 ml-3 2xl:text-2xl xl:text-xl text-lg Montserrat">
              {item.title}
            </div>
          </div>
          <div 
            className="2xl:mt-6 lg:mt-5 mt-4 lg:text-base text-sm" 
            style={{lineHeight: 1.6}}
          >
            {item.content}
          </div>
        </div>
      </div>
    ))}
  </div>
}

export default AboutList;