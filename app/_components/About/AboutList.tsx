import { useIntersectionObserver } from "@uidotdev/usehooks";

interface IAboutListItem {
  id: number;
  icon: string;
  title: string;
  content: string;
}

const AboutList = () => {

  const list:IAboutListItem[] = [
    {
      id: 0,
      icon: "/images/icons/uxui.png",
      title: "UX·UI Sense",
      content: "뛰어난 UX, UI 감각으로 디자이너의 손길이 미처 닿지 않는 부분에서 사용자의 편의성을 높이기 위해 노력합니다."
    },
    {
      id: 1,
      icon: "/images/icons/uxui.png",
      title: "UX·UI Sense",
      content: "뛰어난 UX, UI 감각으로 디자이너의 손길이 미처 닿지 않는 부분에서 사용자의 편의성을 높이기 위해 노력합니다."
    },
    {
      id: 2,
      icon: "/images/icons/uxui.png",
      title: "UX·UI Sense",
      content: "뛰어난 UX, UI 감각으로 디자이너의 손길이 미처 닿지 않는 부분에서 사용자의 편의성을 높이기 위해 노력합니다."
    },
  ]

  const ListItem = ({item}:{item:IAboutListItem}) => {
    const [ref, entry] = useIntersectionObserver({
      threshold: 0.1,
      root: null,
      rootMargin: "0px",
    });

    return <div
      ref={ref}
      className={`w-[27%] after:pb-[100%] relative after:block ${entry?.intersectionRatio ? "fade-in-bottom" : "opacity-0"}`}
      style={{
        animationDelay: `${2 + 0.3 * item.id}s`
      }}
    >
      <div className="absolute w-full h-full rounded-[30px] bg-gradient-to-br from-[rgba(52,194,203,0.2)] to-[rgba(18,151,159,0.2)] from p-6">
        <div className="flex items-center">
          <div className="w-1/4 after:pb-[100%] relative after:block">
            <div className="absolute w-full h-full rounded-full bg-blue-1 dark:bg-blue-4 bg-opacity-20 dark:bg-opacity-20 flex items-center justify-center">
              <img src={item.icon} className="w-3/5 dark:invert" />
            </div>
          </div>
          <div className="2xlml-5 ml-3 2xl:text-2xl lg:text-xl text-lg Montserrat">
            {item.title}
          </div>
        </div>
        <div className="2xl:mt-7 lg:mt-6 mt-5 lg:text-sm text-xs">
          {item.content}
        </div>
      </div>
    </div>
  }

  return <div className="w-full h-full flex items-center justify-between relative">
    {list.map(item => (
      <ListItem key={`about-list-item-${item.id}`} item={item}/>  
    ))}
  </div>
}

export default AboutList;